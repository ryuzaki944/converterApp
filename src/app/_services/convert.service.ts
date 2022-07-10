import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ConvertService {
  constructor(private http: HttpClient) {}
  convert(file: any): Observable<any> {
    console.log(file, 'file')
    const formData: FormData = new FormData();
    formData.append('imageData', file);

    const params: any = {
      format: file.format,
      outPath: file.name,
      storage: 'test',
    };

    const options: any = { 
      headers: { authorization: environment.apiToken },
      params: params,
    };

    return this.http.post(
      `https://api.aspose.cloud/v3.0/imaging/convert`,
      formData,
      options
    );
  }

  getConvertedFile(file: any): Observable<any> {
    console.log(file, 'get')
    const formData: FormData = new FormData();
    formData.append('imageData', file);

    const params: any = {
      format: file.format,
      storage: 'test',
    };

    const options: any = { 
      headers: { authorization: environment.apiToken },
      params: params,
      responseType: `blob`
    };

    console.log(options, 'options')
    return this.http.get(
      `https://api.aspose.cloud/v3.0/imaging/${file.name}/convert`,
      options
    );
  }
}
