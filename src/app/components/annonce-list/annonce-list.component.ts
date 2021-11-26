import { Component, OnInit } from '@angular/core';
import { Annonce } from 'src/app/models/annonce';
import { AnnonceService } from 'src/app/services/annonce.service';

@Component({
  selector: 'app-annonce-list',
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.css']
})
export class AnnonceListComponent implements OnInit {


  annonces: any;
  currentAnnonce = new Annonce();
  currentIndex = -1;
  titre = '';

  constructor(private annonceService: AnnonceService) { }

  ngOnInit(): void {
    this.readAnnonces();
  }

  public createImgPath =  (serverPath: string) => {
    return `https://localhost:44356/Resources/Images/${serverPath}`;
  }

  readAnnonces(): void {
    this.annonceService.readAll()
      .subscribe(
        annonces => {
          this.annonces = annonces;
          console.log(annonces);
        },
        error => {
          console.log(error);
        });
  }

  refresh(): void {
    this.readAnnonces();
    this.currentAnnonce = new Annonce();
    this.currentIndex = -1;
  }

  setCurrentAnnonce(annonce:any, index:any): void {
    
    this.currentAnnonce = annonce;
    this.currentIndex = index;
    console.log(this.currentAnnonce);
  }

  

  searchBytitre(): void {
    this.annonceService.searchByTitre(this.titre)
      .subscribe(
        annonces => {
          this.annonces = annonces;
          console.log(annonces);
        },
        error => {
          console.log(error);
        });
  }

}
