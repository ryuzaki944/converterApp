import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
      quality: 75,
      compressionType: 'baseline',
      fromScratch: false,
      outPath: file.name,
      storage: 'test',
    };

    const options: any = { 
      headers: { authorization: environment.apiToken },
      params: params,
    };

    return this.http.post(
      `https://api.aspose.cloud/v3.0/imaging/${file?.name.split('.')[1]}`,
      formData,
      options
    );
  }

  getConvertedFile(file: any) {
    console.log(file, 'get')
    const formData: FormData = new FormData();
    formData.append('imageData', file);

    const params: any = {
      quality: 75,
      compressionType: 'baseline',
      fromScratch: false,
      storage: 'test',
    };

    const options: any = { 
      headers: { authorization: environment.apiToken },
      params: params,
    };

    console.log(options, 'options')
    return this.http.get(
      `https://api.aspose.cloud/v3.0/imaging/bagjanTest/jpg`,
      options
    );
  }
}
