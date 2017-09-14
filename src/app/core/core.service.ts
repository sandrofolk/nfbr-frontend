import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import {UnidadeMedida} from '../unidades-medida/unidades-medida.model';
import {NFBR_API, NFBR_API_TOKEN_AUTH, NFBR_API_TOKEN_REFRESH} from '../app.api';
import {ErrorHandler} from '../app.error-handler';
import {Uf} from '../ufs/ufs.model';


@Injectable()
export class CoreService {
  private headers: Headers = new Headers();
  private options: any;

  private token: string;
  contribuinte: string;
  email: string;
  avatar: string;

  constructor(private http: Http) {
    // this.headers.append('Authorization', 'Basic ' + btoa(this.username + ':' + this.password));
    // this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //
    // this.options = new RequestOptions({ headers: this.headers });
  }

  login(form: any) {
    return this.http.post(
      `${NFBR_API_TOKEN_AUTH}`,
      {email: form.email, password: form.password}
    ).map(response => {
      console.log(response.json());
      this.token = response.json().token;
      this.contribuinte = response.json().user.contribuinte;
      this.email = response.json().user.email;
      this.avatar = response.json().user.get_avatar_url;

      this.headers.append('Authorization', 'JWT ' + this.token);
      this.options = new RequestOptions({ headers: this.headers });
    });
  }

  // refresh() {
  //   if (this.token === null) {
  //     this.login();
  //   } else {
  //     return this.http.post(
  //       `${NFBR_API_TOKEN_REFRESH}`,
  //       {token: this.token}
  //     ).map(response => {
  //       this.token = response.json().token;
  //     });
  //   }
  // }

  unidadeMedida(page?: number, limit?: number): Observable<any> {
    // aqui tem que chamar refresh() antes...

    let _offset;
    _offset = (page - 1) * limit;
    return this.http.get(`${NFBR_API}/unidade_medida/?limit=${limit}&offset=${_offset}`, this.options)
      .map(response => response.json())
      .catch(ErrorHandler.handlerError);
  }

  uf(): Observable<Uf[]> {
    return this.http.get(`${NFBR_API}/uf/`, this.options)
      .map(response => response.json().results)
      .catch(ErrorHandler.handlerError);
  }

}