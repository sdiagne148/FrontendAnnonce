import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonce.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-annonce-create',
  templateUrl: './annonce-create.component.html',
  styleUrls: ['./annonce-create.component.css']
})
export class AnnonceCreateComponent implements OnInit {

  annonce = {
    titre: '',
    description: ''
  };
  submitted = false;
  public message: string='';

  constructor(private annonceService: AnnonceService) { }

  ngOnInit(): void {
  }

  createAnnonce(): void {
    const data = {
      titre: this.annonce.titre,
      description: this.annonce.description
    };

    this.annonceService.create(data)
      .subscribe(
        response => {
          console.log(response);
        
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newAnnonce(): void {
    this.submitted = false;
    this.annonce = {
      titre: '',
      description: ''
    };
  }


}
