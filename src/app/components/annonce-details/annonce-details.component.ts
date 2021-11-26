import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonce.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Annonce } from 'src/app/models/annonce';
import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-annonce-details',
  templateUrl: './annonce-details.component.html',
  styleUrls: ['./annonce-details.component.css']
})
export class AnnonceDetailsComponent implements OnInit {

  currentAnnonce = new Annonce();
  message = '';
  id:any=0;
  progress: number=0;

 
  constructor(
    private annonceService: AnnonceService,
    private route: ActivatedRoute,
    private router: Router
    ,private http: HttpClient) { }

  ngOnInit(): void {
    this.message = '';
    this.id=this.route.snapshot.paramMap.get('id');
    this.getAnnonce(this.id);
  }

  
  public uploadFile = (files:any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('annonceFile', fileToUpload, fileToUpload.name);
    this.http.post('https://localhost:44356/api/v1/Annonce/Upload/'+this.id, formData, {reportProgress: true, observe: 'events'})
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        if (event.total) {  
          const total: number = event.total;  
          this.progress = Math.round(100 * event.loaded / total);
        }   
      }   
      else if (event.type === HttpEventType.Response) {
        this.message = 'Image uploade avec succes.';
        
      }
    }); 
   
  } 

  getAnnonce(id:any): void {
    this.annonceService.read(id)
      .subscribe(
        annonce => {
          this.currentAnnonce = annonce;
          console.log(annonce);
        },
        error => {
          console.log(error);
        });
  }

  

  updateAnnonce(): void {
    this.annonceService.update(this.currentAnnonce.id, this.currentAnnonce)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'L\'annonce a été mise à jour!';
        },
        error => {
          console.log(error);
        });
  }

  deleteAnnonce(): void {
    this.annonceService.delete(this.currentAnnonce.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/annonces']);
        },
        error => {
          console.log(error);
        });
  }

}
