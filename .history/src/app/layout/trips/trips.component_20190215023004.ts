import { AdresseService } from './../adresses/adresses.service';
import { Adresse } from './../adresses/Adresse';
import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Http, RequestOptions, Headers } from '@angular/http';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TripService } from './trips.service';
import {Trip} from './Trip';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
// import { Observable} from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { LoginService } from 'src/app/login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

//import * as bootstrap from 'bootstrap';

import * as $ from 'jquery';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf'; 
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
//import * as angular from 'angular';
//import * as XLSX from 'ts-xlsx';
import * as XLSX from 'xlsx';

declare var angular: any;
declare var UIkit: any;

declare var require: any;
const TunisiaGovAndDelg = require('./tunisia.js');
type AOA = any[][];
@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss'],
    animations: [routerTransition()]
})
export class TripsComponent implements OnInit {
    

    jsonObj1:any;
    closeResult: string;
    auth:any
    id:any;
    idTrip:any;
    Adresses =[];
    trips: Trip[];
    tripss: any;
    items = [];
    itemsSearch = [];
    itemsLocal = [];
    jsonObj: any;
    result: any;
    datas: any = null;
    obj: Trip;
    objTrip = new Trip();

    checkedTrips = [];
    closedTrips = [];

    nxtBtnDisabled = false;
    prvBtnDisabled = false;
    nDate: any;
    pDate: any;

    base64textString = [];

    driver:any;
    Listdriver:any;
    currentUser: any;

    cityAdresseExp: any;
    contactAdresseExp: any;
    telContAdresseExp: any;
    cityAdresseDest: any;
    labelAdresseDest: any;
    contactAdresseDest: any;
    telContAdresseDest: any;
    selectedAdresseExp: any;
    selectedAdresseDest: any;

    selectedTripType: any;
    longueurTrip: any;
    largeurTrip: any;
    hauteurTrip: any;
    poidsTrip: any;
    imgTrip: any;
    valueTrip: any;
    descriptionTrip: any;
    modeLiv: any;
    typePaiement: any;
    sizePack: string;
    pricePack: number;
    dataUser: any;
    poidVol: any;
    distancePack: any;

    fraixTotal: any;
    valeurTotal: any;

    tripBl: any;
    isVisible: boolean;

    searchTerm: string = '';
    input: any;
    latGlobalDest: any;
    lngGlobalDest: any;
    cityGlobalDest: any;
    random: any;
    scans: any;

    numDisplayedElement: any;
    sizeListTrip: any;
    displayedNumber: any;
    //chooseView = 'none';
    chooseView: any;
    displayedNumberList = ['20', '50', '70', '100', '150', '200', '300', '400', '500', 'all'];
    inputPreMessageToClient: any;
    inputCusMessageToClient: any;
    PreMessages = ['Numéro incorrect !', 'Client non joignable par téléphone !',
     'Colis non conforme à l\'attente du client', 'Client absent au RDV !', 'Tout est bien :)', 'Client contacté.'];
    trpMsg: any;

    statusList = ['cherche un livreur', 'Livreur en chemin', 'Chez Livreur', 'livraison en cours', 'Livree', 'Annulée', 'Retour'];

    dateJ: any;
    totalTripInManifest: any;

    zipCode: any;
    gouvernorat: any;
    delegation: any;
    inputComposedAdresse: any;
    latitude2: number;
    longitude2: number;

    displayQrCode: boolean;
    selectedAll: any;
    dnow: any;
    changeColorByStatusTrip: boolean;
    refColor: boolean;
    varcolor: any;

    startDateFilter: any; endDateFilter: any; clientFilter: any; stateFilter: any; enRetardFilter: any; payementStatusFilter: any; 

    idUserFiltredTrip: any; dateFiltredTrip: any; dateFiltredTrip2: any; sizeFiltredTrip: any; 
    keyFiltredTrip: any; keyFiltredTrip1: any; keyFiltredTrip2: any; keyFiltredTrip3: any; keyFiltredTrip4: any; btnFiltredTrip: any;

    selectedAdresseExpExcel: any;

    arrayBuffer: any;
    file: File;
    tripsFromExcel: AOA;
    tripsFromExcelTemp: AOA;
    jsonExcelObj: any;
    tunisiaData1: any[] = [];
    tunisiaData = 
    ["Residence Kortoba Ariana Ville 2058", "Cite El Intissar 1 Ariana Ville 2091", "Borj El Khoukha Sidi Thabet 2032", "Cite Ezzitoun 1 La Soukra 2036", "Riadh Landlous Ariana Ville 2058", "Cite El Intissar 2 Ariana Ville 2091", "Borj Youssef Sidi Thabet 2032", "Cite Ezzitoun 2 La Soukra 2036", "Cite Jamil Ariana Ville 2091", "Cebalet Ben Ammar Sidi Thabet 2032", "Cite Ezzouaidia La Soukra 2036", "El Menzah 5 Ariana Ville 2091", "Chorfech 12 Sidi Thabet 2032", "Cite Farhat La Soukra 2036", "El Menzah 6 Ariana Ville 2091", "Cite Dridi Sidi Thabet 2032", "Cite Fateh La Soukra 2036", "Cite El Bokri Sidi Thabet 2032", "Cite Fonciere La Soukra 2036", "Cite El Frachich Sidi Thabet 2032", "Cite Snit La Soukra 2036", "Cite El Ghribi Sidi Thabet 2032", "Cite Touilia La Soukra 2036", "Cite El Methalithe Sidi Thabet 2032", "Dar Fadhal La Soukra 2036", "Borj El Hadj Kalaat Landlous 2061", "Cite Messouda Sidi Thabet 2032", "La Soukra La Soukra 2036", "El Misra Kalaat Landlous 2061", "Cite Ouvriere Sidi Thabet 2032", "Mosque Erraoudha La Soukra 2036", "Ferme Hababou Kalaat Landlous 2061", "Cite Sidi Marouane Sidi Thabet 2032", "Residence 26-26 La Soukra 2036", "Cite De La Rtt 2 Raoued 2083", "Bejaoua 2 Sidi Thabet 2020", "Ferme Mustapha Kalaat Landlous 2061", "Cite Ali Bourguiba Mnihla 2094", "Ezzaouia Sidi Thabet 2032", "Residence Ahlem La Soukra 2036", "Cite El Abadla Raoued 2083", "Cite 18 Janvier Sidi Thabet 2020", "Henchir Touba Kalaat Landlous 2061", "Cite De La Republique Mnihla 2094", "Jabbes Sidi Thabet 2032", "Residence Meriem La Soukra 2036", "Cite El Amel Raoued 2083", "Cite Afh Sidi Thabet 2020", "Henchir Toubias Kalaat Landlous 2061", "Cite El Bassatine1 Mnihla 2094", "Jabbes El Borj Sidi Thabet 2032", "Sidi Frej La Soukra 2036", "Cite El Ghazala 1 Raoued 2083", "Cite Des Agriculteurs Sidi Thabet 2020", "Pont De Bizerte Kalaat Landlous 2061", "Cite El Bassatine2 Mnihla 2094", "Sidi Salah La Soukra 2036", "Cite El Ghazala 2 Raoued 2083", "Cite Des Oranges Sidi Thabet 2020", "Cite El Bassatine3 Mnihla 2094", "Sidi Soufiene La Soukra 2036", "Ariana Ariana Ville 2080", "Cite El Wafa Raoued 2083", "Cite El Gouazine Sidi Thabet 2020", "Cite El Gouabsia Mnihla 2094", "Village Essahli La Soukra 2036", "Cite Des Roses Ariana Ville 2080", "Cite Ennasr Raoued 2083", "Cite El Mbarka Sidi Thabet 2020", "Cite El Ouard Mnihla 2094", "Centre Commercial Ikram Ariana Ville 2037", "Cite Du Jardin Ariana Ville 2080", "Cite Ennkhilet Raoued 2083", "Cite El Mrezgua Sidi Thabet 2020", "Cite Ennasr Mnihla 2094", "Cite Ennasr 1 Ariana Ville 2037", "Cite Du Printemps Ariana Ville 2080", "Cite Essahafa Raoued 2083", "Cite Essaada Sidi Thabet 2020", "Cite Essaada Mnihla 2094", "Cite Ennasr 2 Ariana Ville 2037", "Cite Ennouzha Ariana Ville 2080", "Cite Ibn Rachik Raoued 2083", "Cite Ettbaieb Sidi Thabet 2020", "Cite Rafaha Mnihla 2094", "El Menzah 7 Ariana Ville 2037", "Cite Essaada (Ariana) Ariana Ville 2080", "Cite Mehrzia 2 Raoued 2083", "Cite Jardins Sidi Thabet 2020", "Cite Rous El Harayek Mnihla 2094", "El Menzah 8 Ariana Ville 2037", "Cite Jaafar Ariana Ville 2080", "Jaafar 1 Raoued 2083", "Cite Mongi Slim Sidi Thabet 2020", "Essanhaji Mnihla 2094", "Residence Ennour ( Naser 1) Ariana Ville 2037", "Nouvelle Ariana Ariana Ville 2080", "Jaafar 2 Raoued 2083", "Sidi Thabet Sidi Thabet 2020", "Mnihla Mnihla 2094", "Residence Ennour ( Naser 2) Ariana Ville 2037", "Residence Ennour (Ariana) Ariana Ville 2080", "Residence Ennasr Mnihla 2094", "Cite Chaker Raoued 2081", "Cite De La Mosque Raoued 2081", "Cite El Mouaouiet Raoued 2081", "Cite El Mountazeh Raoued 2081", "Complexe Technologique Raoued 2088", "Cite Ennour Jaafar Raoued 2081", "Cite Erriadh Raoued 2081", "Cite Essaada Raoued 2081", "Cite 18 Janvier Ettadhamen 2041", "Cite Sidi Slimene Raoued 2081", "Cite Snit Raoued 2081", "Cite Ben Yerfes Ettadhamen 2041", "Douar El Hendi Raoued 2081", "Cite El Houda Ettadhamen 2041", "El Hessiene Raoued 2081", "Borj Louzir La Soukra 2073", "Cite Ennasser Ettadhamen 2041", "Cite Ettadhamen Ettadhamen 2041", "Oued El Khayat Raoued 2081", "Cite Ben Kilani La Soukra 2073", "Cite Ettayarene Ettadhamen 2041", "Oued El Makhzen Raoued 2081", "Cite De La Sante La Soukra 2073", "Aeroport Tunis Carthage La Soukra 2035", "Cite Sfar Ettadhamen 2041", "Residence El Ayech Raoued 2081", "Cite El Behi Ladghem La Soukra 2073", "Charguia 1 La Soukra 2035", "Cite Snit 2 Ettadhamen 2041", "Residence El Ouns Raoued 2081", "Cite 7 Novembre Raoued 2056", "Cite Bir El Araies Kalaat Landlous 2022", "Cite El Feth La Soukra 2073", "Charguia 2 La Soukra 2035", "Cite Snit Nagra Ettadhamen 2041", "Residence Ennarjes Raoued 2081", "Cite Aeroport Raoued 2056", "Cite Des Martyrs Kalaat Landlous 2022", "Cite El Hana La Soukra 2073", "Station Marchandises Fret La Soukra 2035", "Residence Essalem Raoued 2081", "Cite Chargui Raoued 2056", "Cite El Fejja Kalaat Landlous 2022", "Cite El Mansoura La Soukra 2073", "Residence Rim Raoued 2081", "Cite Des Juges Raoued 2056", "Cite El Mourouj Kalaat Landlous 2022", "Cite El Ouroud La Soukra 2073", "Chotrana 1 La Soukra 2036", "Route Ezzaouia Raoued 2081", "Cite El Yamama Raoued 2056", "Cite El Oulja Kalaat Landlous 2022", "Cite Ennacim La Soukra 2073", "Chotrana 2 La Soukra 2036", "Ariana Essoughra Raoued 2081", "Cite Sidi Salah Raoued 2056", "Cite Essibous Kalaat Landlous 2022", "Cite Ennouzha 3 La Soukra 2073", "Chotrana 3 La Soukra 2036", "Borj Touil Raoued 2081", "Cite Zghab Raoued 2056", "Cite Tarek Ibn Zied Kalaat Landlous 2022", "Cite Ettaamir 5 La Soukra 2073", "Cite Astree La Soukra 2036", "Bou Hnech Raoued 2081", "El Brarja Raoued 2056", "Kalaat Landlous Kalaat Landlous 2022", "Cite Ghouzaila La Soukra 2073", "Cite Belabla La Soukra 2036", "Raoued Raoued 2056", "Cite Hedi Nouira La Soukra 2073", "Cite Ben Hessine La Soukra 2036", "Chorfech Sidi Thabet 2057", "Cite Jebira La Soukra 2073", "Cite Bou Fares La Soukra 2036", "Chorfech 2 Sidi Thabet 2057", "Cite Snit La Soukra 2073", "Cite Chouachia La Soukra 2036", "Chorfech 24 Sidi Thabet 2057", "Cite Star La Soukra 2073", "Cite Chouchene La Soukra 2036", "Chorfech 8 Sidi Thabet 2057", "Residence El Ouns La Soukra 2073", "Cite De L'Aeroport La Soukra 2036", "Cite Borj Turki 1 Ariana Ville 2058", "Residence Ennesrine La Soukra 2073", "Cite De La Terre Libre La Soukra 2036", "Cite Borj Turki 2 Ariana Ville 2058", "Cite Des Juges La Soukra 2036", "Cite De La Sante Ariana Ville 2058", "Borj El Baccouche Ariana Ville 2027", "Cite El Azzef La Soukra 2036", "Cite Essaada (Riadh Andalous) Ariana Ville 2058", "Cite El Boustene 1 La Soukra 2036", "Cite Karim Ariana Ville 2058", "Cite El Boustene 2 La Soukra 2036", "Cite Mehrzia 1 Ariana Ville 2058", "Cite El Henaya La Soukra 2036", "Residence El Ouns Ariana Ville 2058", "Cite El Maid La Soukra 2036", "Residence Ibn Zeidoun Ariana Ville 2058", "Cite Belvedere 2 Ariana Ville 2091", "Cite Elyes La Soukra 2036", "Residence Ichbilia Ariana Ville 2058", "Cite Du Soleil Ariana Ville 2091", "Cite Ettaamir La Soukra 2036", "Cite Beharnia Testour 9014", "Borj Brahim Teboursouk 9032", "Rhiba Testour 9060", "Cite Pont Trageon Beja Nord 9000", "Cite Ben Karouia Testour 9014", "Douga Teboursouk 9032", "Testour Testour 9060", "Cite S.R.Transport Beja Nord 9000", "Cite Ben Othman Testour 9014", "Khalled Teboursouk 9032", "Zeldou Testour 9060", "Cite Salah El Maghraoui Beja Nord 9000", "Cite Dar Echabeb Testour 9014", "Sidi Mediene Mejez El Bab 9034", "Esskhira Testour 9061", "Cite Salambo Beja Nord 9000", "Cite El Gadhoum Testour 9014", "Ain El Hammam Teboursouk 9040", "Henchir Bou Sofra Testour 9061", "Cite Sidi Frej Beja Nord 9000", "Cite El Mendra Testour 9014", "Ain El Kehoul Teboursouk 9040", "Ain Tounga Testour 9062", "Cite Snit Beja Nord 9000", "Cite Erraoudha Testour 9014", "Ain El Melliti Teboursouk 9040", "Argoub Ezzaatar Mejez El Bab 9070", "Cite Taieb Mhiri Beja Nord 9000", "Cite Essayadine Testour 9014", "Ain Jemmala Teboursouk 9040", "Cite Baccar Mejez El Bab 9070", "Cite Usine Du Sucre1 Beja Nord 9000", "Cite Fedden Jemaa Testour 9014", "Bir Ettouta Teboursouk 9040", "Ain Ksar Hadid Beja Nord 9000", "Cite De La Sante Mejez El Bab 9070", "Cite Usine Du Sucre2 Beja Nord 9000", "Cite Jabbess Testour 9014", "Bouzaida Teboursouk 9040", "Beja Beja Nord 9000", "Cite Des Proffesseurs Mejez El Bab 9070", "El Hamrounia Beja Nord 9000", "Cite Kichtilou Testour 9014", "Cite Ain El Karma Teboursouk 9040", "Bou Keslane Beja Nord 9000", "Cite Dhamene Mejez El Bab 9070", "El Mounchar Beja Nord 9000", "Cite Ouled Slimane Testour 9014", "Cite Ain Mrad Teboursouk 9040", "Charchara Beja Nord 9000", "Cite Du Gouvernorat Mejez El Bab 9070", "El Yousri Beja Nord 9000", "Cite Sidi Khouili Testour 9014", "Cite De La Republique Teboursouk 9040", "Cite Afh Beja Nord 9000", "Cite El Azima 1 Mejez El Bab 9070", "Fatnassa Beja Nord 9000", "Cite Tafercha Testour 9014", "Cite Des Martyrs Teboursouk 9040", "Cite Ain Bazaz Beja Nord 9000", "Cite El Azima 2 Mejez El Bab 9070", "Hajar Amor Beja Nord 9000", "Cite Tijani Testour 9014", "Cite Du Stade Teboursouk 9040", "Cite Ain Chemes Beja Nord 9000", "Cite El Azima 3 Mejez El Bab 9070", "Kasseb Beja Nord 9000", "El Mellah Testour 9014", "Cite El Bassatine Teboursouk 9040", "Cite Ain El Ghoula Beja Nord 9000", "Cite El Bahrine Mejez El Bab 9070", "Lafarke Beja Nord 9000", "Esslouguia Testour 9014", "Cite El Glai Teboursouk 9040", "Cite Beja El Jadida Beja Nord 9000", "Cite El Behi Mejez El Bab 9070", "Nagachia Beja Nord 9000", "Jebel Fellous Testour 9014", "Cite El Gourjani Teboursouk 9040", "Cite Belle Vue Beja Nord 9000", "Cite El Fateh Mejez El Bab 9070", "Tarhouni Beja Nord 9000", "Ouljet Doukhane Testour 9014", "Cite El Hadj Abdallah Teboursouk 9040", "Cite Bir Hofra Beja Nord 9000", "Cite El Ferdaous 1 Mejez El Bab 9070", "Beni Said Nefza 9010", "El Ksar Mejez El Bab 9015", "Cite El Ksar Teboursouk 9040", "Cite Boutraa Beja Nord 9000", "Cite El Hana Mejez El Bab 9070", "Cite De La Liberte Nefza 9010", "Mastouta Beja Sud 9021", "Cite Ennacim Teboursouk 9040", "Cite Cnrps Beja Nord 9000", "Cite El Manar Mejez El Bab 9070", "Cite De La Poste Nefza 9010", "Mastouta Gare Beja Sud 9021", "Cite Ennacim 1 Teboursouk 9040", "Cite De La Police Beja Nord 9000", "Cite El Menchari Mejez El Bab 9070", "Cite Des Carrieres Nefza 9010", "Sidi Smail Beja Sud 9021", "Cite Ennacim 2 Teboursouk 9040", "Cite De La Sante 1 Beja Nord 9000", "Cite Erriadh Mejez El Bab 9070", "Cite Des Roses Nefza 9010", "Cite 2 Mars Thibar 9022", "Cite Ezzayatine 1 Teboursouk 9040", "Cite De La Sante 2 Beja Nord 9000", "Cite Essedk Mejez El Bab 9070", "Cite El Mhiri Nefza 9010", "Cite Commerciale Thibar 9022", "Cite Ezzayatine 2 Teboursouk 9040", "Cite Des Mimosas Beja Nord 9000", "Cite Ettadhamen Mejez El Bab 9070", "Cite Erriadh Nefza 9010", "Cite Des Ouvriers Thibar 9022", "Cite Ibn Khaldoun Teboursouk 9040", "Cite Des Proffesseurs Beja Nord 9000", "Cite Ezzouhour Mejez El Bab 9070", "Cite Essaada Nefza 9010", "Cite El Olfa Thibar 9022", "Cite Ibn Sina Teboursouk 9040", "Cite Des Roses Beja Nord 9000", "Cite Jallazia Mejez El Bab 9070", "Cite Ezzouhour Nefza 9010", "Cite Ennour Thibar 9022", "Cite Industrielle Teboursouk 9040", "Cite Dhamene Beja Nord 9000", "Cite Majerda Mejez El Bab 9070", "Cite Independance Nefza 9010", "Cite Essalama Thibar 9022", "Cite Jardins Teboursouk 9040", "Cite Du Gouvernorat Beja Nord 9000", "Gueriche El Oued Mejez El Bab 9070", "Cite Mixte Nefza 9010", "Cite Hached Thibar 9022", "Cite Meska Teboursouk 9040", "Cite Echifa Beja Nord 9000", "Hidous Mejez El Bab 9070", "Cite Mohsen Limam Nefza 9010", "Cite Ibn Khaldoun Thibar 9022", "Cite Oued Essah Teboursouk 9040", "Cite Economie Du Nord Beja Nord 9000", "Iden Mejez El Bab 9070", "Cite Rim Nefza 9010", "Ennechima Thibar 9022", "Cite Sidi Bagga Teboursouk 9040", "Cite Edhahbia 1 Beja Nord 9000", "Mejez El Bab Mejez El Bab 9070", "Cite Sidi Saad Nefza 9010", "Thibar Thibar 9022", "Dougga Rouines Teboursouk 9040", "Cite Edhahbia 2 Beja Nord 9000", "Sidi Ahmed Jedidi Mejez El Bab 9070", "Dar El Hit Nefza 9010", "Cite El Amel Beja Sud 9023", "El Ayedh Teboursouk 9040", "Cite El Baraka Beja Nord 9000", "Cite 02 Mars Mejez El Bab 9071", "El Amamria Nefza 9010", "El Maagoula Beja Sud 9023", "El Faouar Teboursouk 9040", "Cite El Biadha Beja Nord 9000", "El Griaat Mejez El Bab 9071", "El Ayayada Jamila Nefza 9010", "Toukabeur Mejez El Bab 9024", "El Matria Teboursouk 9040", "Cite El Boukhari Beja Nord 9000", "Chaouech Mejez El Bab 9072", "El Mazdour Nefza 9010", "Fatnassa Nefza 9010", "Sidi Frej Beja Sud 9029", "Naffet Teboursouk 9040", "Cite El Boustene Beja Nord 9000", "El Herri Mejez El Bab 9075", "Jbel Diss Nefza 9010", "Adailia Amdoun 9030", "Ouled Marai Teboursouk 9040", "Cite El Habib Beja Nord 9000", "Bir El Euch Goubellat 9080", "Jemil Nefza 9010", "Ain El Goussa Amdoun 9030", "Rihana Teboursouk 9040", "Cite El Habibia Beja Nord 9000", "Briouig Goubellat 9080", "Nefza Nefza 9010", "Ain Ghenem Amdoun 9030", "Teboursouk Teboursouk 9040", "Cite El Haouari Beja Nord 9000", "Cheik El Ouediane El Guebli Goubellat 9080", "Oued Bouzenna Nefza 9010", "Beni Melek Amdoun 9030", "Ain Eddefali Thibar 9042", "Cite El Khadhra Beja Nord 9000", "Cite Des Fonctionnaires Goubellat 9080", "Oued Damous Nefza 9010", "Bouris Amdoun 9030", "Djebba Thibar 9042", "Cite El Khadhra Superieur Beja Nord 9000", "Cite El Hana Goubellat 9080", "Ouled Houimel Nefza 9010", "Cite De La Poste Amdoun 9030", "El Henancha Thibar 9042", "Cite El Manar 1 Beja Nord 9000", "Cite El Izdihar Goubellat 9080", "Ouled Kacem Nefza 9010", "Cite Erraoudha Amdoun 9030", "Sidi Nasser Mejez El Bab 9044", "Cite El Manar 2 Beja Nord 9000", "Cite El Kamh Goubellat 9080", "Oum Laabid Nefza 9010", "Cite Hached Amdoun 9030", "Fadden Essouk Teboursouk 9046", "Cite El Manar 3 Beja Nord 9000", "Cite Essaada Goubellat 9080", "Tababa Nefza 9011", "Cite Taieb Mhiri Amdoun 9030", "Hammam Sayala Beja Sud 9052", "Cite El Manar 4 Beja Nord 9000", "Cite Essanabel Goubellat 9080", "Ain Zakkar Nefza 9012", "Eddghabjia Amdoun 9030", "Ain Younes Testour 9060", "Cite El Manar 5 Beja Nord 9000", "Cite Ezzouhour Goubellat 9080", "Bou Garnouna Nefza 9012", "Edhhirat Amdoun 9030", "Cite 20 Mars Testour 9060", "Cite El Mekmda Beja Nord 9000", "Cite Populaire Goubellat 9080", "El Hemaidia Nefza 9012", "El Fraijia Amdoun 9030", "Cite 26 Fevrier Testour 9060", "Cite El Mhella Beja Nord 9000", "Dour Ismail Goubellat 9080", "El Mecherga Nefza 9012", "El Ghorfa Amdoun 9030", "Cite Des Andalous Testour 9060", "Cite El Moustakbel Beja Nord 9000", "El Fedhailia Goubellat 9080", "El Oulija Nefza 9012", "El Graia Amdoun 9030", "Cite El Bassatine Testour 9060", "Cite El Mzara Beja Nord 9000", "El Gammarti Goubellat 9080", "Ettaref Nefza 9012", "El Hlikat Amdoun 9030", "Cite El Folla Testour 9060", "Cite El Olfa Beja Nord 9000", "El Ogla Goubellat 9080", "Ezzouaraa Nefza 9012", "El Jouza Amdoun 9030", "Cite El Izdihar Testour 9060", "Cite Ennouzha Beja Nord 9000", "Ettraifa Goubellat 9080", "Ouechtata Nefza 9012", "El Mjales Amdoun 9030", "Cite El Malouf Testour 9060", "Cite Erriadh 2 Beja Nord 9000", "Goubellat Goubellat 9080", "Ouled Salem Nefza 9012", "Gaat El Mouhdi Amdoun 9030", "Cite Ennacim Testour 9060", "Cite Erriadhi 1 Beja Nord 9000", "Khacheb Goubellat 9080", "Zaga Nefza 9012", "Ghouzia Amdoun 9030", "Cite Gharnata 1 Testour 9060", "Cite Essalama Beja Nord 9000", "Khenguet Eddihenne Goubellat 9080", "Cite De La Poste Mejez El Bab 9013", "Maghraoua Amdoun 9030", "Cite Gharnata 2 Testour 9060", "Cite Essalem Beja Nord 9000", "Tella Goubellat 9080", "Cite Education Mejez El Bab 9013", "Menzel Hammed Amdoun 9030", "Cite Ibn Zeidoun Testour 9060", "Cite Essanaouber Beja Nord 9000", "Zone Industrielle Goubellat 9080", "Cite Enfance Mejez El Bab 9013", "Remadhnia Amdoun 9030", "Cite Spiniair Testour 9060", "Cite Ezzouhour Beja Nord 9000", "Grame Goubellat 9083", "Louatia Mejez El Bab 9013", "Sidi Mbarek Amdoun 9030", "El Glaa Testour 9060", "Cite Garde Nationale Beja Nord 9000", "El Ayayda Amdoun 9084", "Oued Ezzitoun Mejez El Bab 9013", "Sidi Saadoun Amdoun 9030", "Jlass Bou Issa Testour 9060", "Cite Ibn Khaldoun Beja Nord 9000", "El Homr Amdoun 9084", "Oued Zarga Mejez El Bab 9013", "Sobah Amdoun 9030", "Mezougha Testour 9060", "Cite Jardins Beja Nord 9000", "Menzel El Gourchi Amdoun 9084", "Bab Bled Testour 9014", "Zahret Mediene Amdoun 9030", "Oued Jedra Testour 9060", "Cite Jebel El Akhdhar Beja Nord 9000", "Cite Bahrnia Testour 9014", "El Mzara Beja Nord 9031", "Ouled Slama Testour 9060", "Cite Ksar Bardo Beja Nord 9000", "Chebedda Fouchana 1135", "Cite Des Ouvriers Hammam Lif 2050", "Cite Ennasr Fouchana 2082", "Cite El Bochra El Mourouj 2074", "Residence Sarra Bou Mhel El Bassatine 2097", "Douar El Houch Fouchana 1135", "Cite Ennahdha Hammam Lif 2050", "Cite Ennouzha Fouchana 2082", "Cite El Faouz El Mourouj 2074", "Residence Sirine Bou Mhel El Bassatine 2097", "Naassen Fouchana 1135", "Cite Ennasr Hammam Lif 2050", "Cite Erriadh Fouchana 2082", "Bir El Kassaa El Mourouj 2059", "Cite El Foll El Mourouj 2074", "Cite El Ezz Rades 2098", "Cite Ennouzha Hammam Lif 2050", "Cite Ezzitoun 1 Fouchana 2082", "Cite El Mourouj 3 Bis El Mourouj 2074", "Cite Nouvelle Rades 2098", "Cite Essanaoubria Hammam Lif 2050", "Cite Khouaja Fouchana 2082", "Cite Bou Akroucha Mohamadia 1145", "Cite El Wifak El Mourouj 2074", "Rades El Mrah Rades 2098", "Cite Hached Hammam Lif 2050", "Cite Snit Fouchana 2082", "Cite Bourbai Mohamadia 1145", "Cite Ennakhil El Mourouj 2074", "Rades Foret Rades 2098", "Cite Kortoba Hammam Lif 2050", "Cite Trabelsi Fouchana 2082", "Cite Cebbalet Chikh Mohamadia 1145", "Cite Ennarjes 1 El Mourouj 2074", "Rades Medina Rades 2098", "Cite Mongi Slim Hammam Lif 2050", "El Menaychia Fouchana 2082", "Cite Chaabane Mohamadia 1145", "Cite Snit Rades 2018", "Cite Ennarjes 2 El Mourouj 2074", "Rades Meliane Rades 2098", "Cite Office Cereale Hammam Lif 2050", "Fouchana Fouchana 2082", "Cite Chebbi Mohamadia 1145", "Decouppage Haj Aleya Rades 2018", "Cite Ennasr 1 El Mourouj 2074", "Rades Mongil Rades 2098", "Cite Thermale Hammam Lif 2050", "Meghira Centre Fouchana 2082", "Cite De La Carriere 1 Mohamadia 1145", "Rades 7 Novembre Rades 2018", "Cite Ennasr 2 El Mourouj 2074", "Cite Boussouffara Hammam Lif 2099", "Hammam Lif Hammam Lif 2050", "Meghira Inzel Fouchana 2082", "Cite De La Carriere 2 Mohamadia 1145", "Village Mediterranee Rades 2018", "Bou Kornine Hammam Lif 2093", "Cite Errachid 1 El Mourouj 2074", "Zone Industrielle El Meghira Fouchana 2082", "Cite Du Lycee Mohamadia 1145", "Ville Sportive Rades 2018", "Cite Bou Kornine 2 Hammam Lif 2093", "Cite Errachid 2 El Mourouj 2074", "Cite El Amen Mohamadia 1145", "Cite Erraoudha El Mourouj 2074", "Cite El Atiq Mohamadia 1145", "Cite Erriadh El Mourouj 2074", "Cite El Baccouch Mohamadia 1145", "Cite Erriadh 2 El Mourouj 2074", "Cite El Bassatine Mohamadia 1145", "Megrine Megrine 2033", "Cite Essalem El Mourouj 2074", "Cite El Elmi 1 Mohamadia 1145", "Megrine Coteau Megrine 2033", "Cite Ibn Jazzar 2 El Mourouj 2074", "Cite El Elmi 2 Mohamadia 1145", "Megrine Superieur Megrine 2033", "Cite Ibn Mandhour El Mourouj 2074", "Cite El Haddad Mohamadia 1145", "Nouvelle Medina Nouvelle Medina 2063", "Hammam Chatt Hammam Chatt 1164", "Sidi Rezig Megrine 2033", "Cite Jardins El Mourouj 2074", "Cite El Hana Mohamadia 1145", "Cite Air Nouvelle Mornag 2064", "Cite 18 Janvier Ezzahra 2034", "Cite Moncef Bey El Mourouj 2074", "Cite El Ksar Mohamadia 1145", "Cite Ettayarane Mornag 2064", "Cite Borj Louzir Ezzahra 2034", "Cite Taher Haddad El Mourouj 2074", "Cite El Omri 1 Mohamadia 1145", "El Abebsa Mornag 2064", "Cite Du Port Ezzahra 2034", "Cite Yargoula El Mourouj 2074", "Cite El Omri 2 Mohamadia 1145", "El Fendria Mornag 2064", "Cite Du Wagon Ezzahra 2034", "El Alia 1 El Mourouj 2074", "Cite Ellouata Mohamadia 1145", "El Kabouti Mornag 2064", "Cite El Ahlem Ezzahra 2034", "El Alia 2 El Mourouj 2074", "Cite 20 Mars Rades 1125", "Cite Ennacim 1 Mohamadia 1145", "Jebel Ersass Mornag 2064", "Cite El Akacia Ezzahra 2034", "El Alia 3 El Mourouj 2074", "Cite Ennour Rades 1125", "Borj Cedria Hammam Chatt 2084", "Cite Ennacim 2 Mohamadia 1145", "Jourjou Mornag 2064", "Cite El Amen Ezzahra 2034", "El Mourouj El Mourouj 2074", "Rades Saline Rades 1125", "Chouchet Rades Rades 2040", "Cite Ennasr Mohamadia 1145", "Mirghna Mornag 2064", "El Yasminette Nouvelle Medina 2096", "Cite El Ezz Ezzahra 2034", "La Belle Residence El Mourouj 2074", "Zone Industrielle 1 Rades 1125", "Cite Mohamed Ali Rades 2040", "Cite Ennouzha Mohamadia 1145", "Sidi Salem El Garci Mornag 2064", "Bou Mhel Bou Mhel El Bassatine 2097", "Cite El Oulija Ezzahra 2034", "Residence Chebbi El Mourouj 2074", "Zone Industrielle 2 Rades 1125", "Cite Rades 2 Rades 2040", "Cite Erriadh Mohamadia 1145", "Cite Ben Miled Ezzahra 2065", "Cite Ben Gamra Bou Mhel El Bassatine 2097", "Cite El Ouns Ezzahra 2034", "Residence Chourouk 1 El Mourouj 2074", "Zone Petroliere Rades 1125", "Cite Sfaxi Rades 2040", "Cite Essaada 1 Mohamadia 1145", "Cite El Habib Ezzahra 2065", "Cite Ben Joud Bou Mhel El Bassatine 2097", "Cite Ennakhil 1 Ezzahra 2034", "Residence Chourouk 2 El Mourouj 2074", "Cite Sncft Rades 2040", "Cite Essaada 2 Mohamadia 1145", "Cite El Houl Ezzahra 2065", "Cite Bou Mhel Bou Mhel El Bassatine 2097", "Cite Ennakhil 2 Ezzahra 2034", "Residence Chourouk 3 El Mourouj 2074", "Cite Taieb Mhiri 1 Rades 2040", "Ain Regad Mornag 2054", "Cite Essaada 3 Mohamadia 1145", "Cite El Ward Ezzahra 2065", "Cite Boutouria Bou Mhel El Bassatine 2097", "Cite Errachid Ezzahra 2034", "Residence De L'Horizon El Mourouj 2074", "Cite Taieb Mhiri 2 Rades 2040", "Barrouta Mornag 2054", "Cite Essalem Mohamadia 1145", "Cite El Yasmine Ezzahra 2065", "Cite Chebil Bou Mhel El Bassatine 2097", "Cite Erriadh Ezzahra 2034", "Residence De La Verdure El Mourouj 2074", "Cite Taieb Mhiri 3 Rades 2040", "Bir Jedid Mornag 2054", "Cite Ettayari Mohamadia 1145", "Cite Ennasr Ezzahra 2065", "Cite De L'Interieur Bou Mhel El Bassatine 2097", "Cite Hedi Khfacha Ezzahra 2034", "Residence Du Printemps El Mourouj 2074", "Rades Rades 2040", "El Gounna Mornag 2054", "Cite Ettouahria Mohamadia 1145", "Ezzahra El Habib Ezzahra 2065", "Cite Des Juges Bou Mhel El Bassatine 2097", "Cite Imen Ezzahra 2034", "Residence El Foll El Mourouj 2074", "Rades Plage Rades 2040", "Henchir Kharrouba Mornag 2054", "Cite Ezzitoun 2 Mohamadia 1145", "Cite Diar Tounes Bou Mhel El Bassatine 2097", "Cite Industrielle Ezzahra 2034", "Residence El Khalil El Mourouj 2074", "Khelidia Mornag 2054", "Cite Fattouma Bourguiba Mohamadia 1145", "Cite El Ahmadi Bou Mhel El Bassatine 2097", "Cite Mrad 1 Ezzahra 2034", "Residence El Mourjene El Mourouj 2074", "Kouenjel Mornag 2054", "Ahmed Zaied Mornag 2090", "Cite Hached 1 Mohamadia 1145", "Cite El Amen Bou Mhel El Bassatine 2097", "Cite Mrad 2 Ezzahra 2034", "Residence El Ouard El Mourouj 2074", "Sidi Messaoud Mornag 2054", "Ben Nouiji Mornag 2090", "Cite Hached 2 Mohamadia 1145", "Cite El Assil Bou Mhel El Bassatine 2097", "Cite Panorama Ezzahra 2034", "Residence El Wafa El Mourouj 2074", "Sidi Othman Landari Mornag 2054", "Borj Essoufi Mornag 2090", "Cite Jaouhara Mohamadia 1145", "Cite El Bassatine Ancien Bou Mhel El Bassatine 2097", "Ezzahra Ezzahra 2034", "Residence Ennacim El Mourouj 2074", "Sondage Mornag 2054", "Bou Jerdga Mornag 2090", "Cite Jardins Mohamadia 1145", "Cite El Ferchichi Bou Mhel El Bassatine 2097", "Residence Ennaoures El Mourouj 2074", "Bir El Bey Hammam Chatt 2055", "Chala Mornag 2090", "Cite Mongi Slim 1 Mohamadia 1145", "Cite El Iklil Bou Mhel El Bassatine 2097", "Residence Ennesrine El Mourouj 2074", "Chamine Mornag 2090", "Cite Mongi Slim 2 Mohamadia 1145", "Cite El Kenani Bou Mhel El Bassatine 2097", "Residence Erraboua El Mourouj 2074", "Cite Ennasr Mornag 2090", "Cite Oudhna Mohamadia 1145", "Cite El Khalij Bou Mhel El Bassatine 2097", "Residence Essaad El Mourouj 2074", "Douar La Porte Mornag 2090", "Cite Taieb Mhiri Mohamadia 1145", "Cite El Khalledi Bou Mhel El Bassatine 2097", "Residence Essaada El Mourouj 2074", "Douar Salem Mornag 2090", "Cite Tnich Mohamadia 1145", "Cite El Mahrajene 1 Bou Mhel El Bassatine 2097", "Residence Essraya El Mourouj 2074", "El Alelgua Mornag 2090", "Immeubles De L'Interieur Mohamadia 1145", "Cite El Mahrajene 2 Bou Mhel El Bassatine 2097", "Residence Ibn Khaldoun El Mourouj 2074", "El Araba Mornag 2090", "Mohamadia Mohamadia 1145", "Cite El Mouna Bou Mhel El Bassatine 2097", "Residence Ibn Zeidoun El Mourouj 2074", "El Haouamed Mornag 2090", "Residence El Ferdaous Mohamadia 1145", "Cite El Wafa Bou Mhel El Bassatine 2097", "Residence Ines El Mourouj 2074", "El Ksibi Mornag 2090", "Residence El Moustakbel Mohamadia 1145", "Cite Ennacim 1 Bou Mhel El Bassatine 2097", "Residence Jinene El Mourouj El Mourouj 2074", "Cite 20 Mars Fouchana 2082", "Ettiayra Mornag 2090", "Residence El Ouns Mohamadia 1145", "Cite Ennacim 2 Bou Mhel El Bassatine 2097", "Residence Meriem El Mourouj 2074", "Ben Arous Sud Ben Arous 2043", "Cite Brim Fouchana 2082", "Ferme Marquee Mornag 2090", "Residence Ettaoufik Mohamadia 1145", "Cite Essafa Bou Mhel El Bassatine 2097", "Residence Sidi Bou Said El Mourouj 2074", "Errissala Mornag 2044", "Cite Chebbi Fouchana 2082", "Henchir Bouchta Mornag 2090", "Cite Essalem Bou Mhel El Bassatine 2097", "Residence Type El Mourouj 2074", "Cite El Amel Fouchana 2082", "Henchir El Ghobar Mornag 2090", "Megrine Chaker Megrine 2024", "Cite Hadrich Bou Mhel El Bassatine 2097", "Residence Zahret El Mourouj El Mourouj 2074", "Cite El Amel 2 Fouchana 2082", "Henchir Khelil Mornag 2090", "Megrine Jaouhara Megrine 2024", "Cite Jlassi Bou Mhel El Bassatine 2097", "Cite El Banefsej Fouchana 2082", "Ben Arous Ben Arous 2013", "Huilerie Bayrem Mornag 2090", "Cite Mezriou Bou Mhel El Bassatine 2097", "Cite El Fateh Fouchana 2082", "Cite Founiz Megrine 2014", "Mornag Mornag 2090", "Cite Alyssa 1 El Mourouj 2074", "Cite Plein Air Bou Mhel El Bassatine 2097", "Cite El Hana Fouchana 2082", "Megrine Riadh Megrine 2014", "Ouzra Mornag 2090", "Cite Alyssa 2 El Mourouj 2074", "Cite Rabiaa Bou Mhel El Bassatine 2097", "Cite El Hidhab Fouchana 2082", "Saint Gobin Megrine 2014", "Sidi Saad Mornag 2090", "Cite Azza 1 El Mourouj 2074", "Cite Snit Bou Mhel El Bassatine 2097", "Cite 7 Novembre Hammam Lif 2050", "Cite El Izdihar Fouchana 2082", "Zone Industrielle Saint Gobin Megrine 2014", "Tarhouna 1 Mornag 2090", "Cite Azza 2 El Mourouj 2074", "Cite Sprols Bou Mhel El Bassatine 2097", "Cite Casino Hammam Lif 2050", "Cite El Misk Fouchana 2082", "Tarhouna 2 Mornag 2090", "Cite Commerciale Abou Sofiane El Mourouj 2074", "Residence Du Mediterrane Bou Mhel El Bassatine 2097", "Cite Dar El Bey Hammam Lif 2050", "Cite El Moustakbel Fouchana 2082", "Zaouit Mornag Mornag 2090", "Cite Commerciale Boukhriss El Mourouj 2074", "Residence El Imara Bou Mhel El Bassatine 2097", "Cite De La Municipalite Hammam Lif 2050", "Cite El Ward Fouchana 2082", "Cite Des Oasis El Mourouj 2074", "Residence Ennacim Bou Mhel El Bassatine 2097", "Bir Zendala Fouchana 1135", "Cite Des Instituteurs Hammam Lif 2050", "Cite El Wifak Fouchana 2082", "Cite El Bassatine El Mourouj 2074", "Residence Ezzouhour Bou Mhel El Bassatine 2097", "Cite El Makarem Menzel Jemil 7035", "Bizerte Hached Bizerte Sud 7071", "Essmayria Sejnane 7010", "Zouaouine Ghar El Melh 7024", "Cite Ettahrir Menzel Jemil 7035", "Menzel Bourguiba Ennajah Menzel Bourguiba 7072", "Haddada Sejnane 7010", "Sounine Ras Jebel 7025", "Cite Ettakaddoum Menzel Jemil 7035", "Beni Atta Ras Jebel 7075", "Sejnane Sejnane 7010", "Cite 7 Novembre Menzel Jemil 7026", "Cite Independance Menzel Jemil 7035", "Cite Bir Remel Menzel Jemil 7080", "Sidi Machreg Sejnane 7010", "Cite Des Oranges Menzel Jemil 7026", "El Ain El Kebira Menzel Jemil 7035", "Cite El Ahlem Menzel Jemil 7080", "Touajnia Sejnane 7010", "Cite El Habib (El Azib) Menzel Jemil 7026", "Menzel Abderrahman Menzel Jemil 7035", "Cite El Baali Menzel Jemil 7080", "Cite El Mourouj Bizerte Sud 7011", "Cite Rurale 1 Menzel Jemil 7026", "Cite Rurale 2 Menzel Jemil 7026", "Teskraya Bizerte Sud 7036", "Cite El Batan Menzel Jemil 7080", "Cite Militaire Bizerte Sud 7011", "El Azib Menzel Jemil 7026", "Ain Rekoub Ghezala 7040", "Cite El Habib (Menzel Jemil) Menzel Jemil 7080", "La Pecherie Bizerte Sud 7011", "Henchir El Moukaouimine Menzel Jemil 7026", "Beni Brahim Ghezala 7040", "Cite El Haddadia Menzel Jemil 7080", "Bazina Joumine 7012", "Maghraoua Menzel Jemil 7026", "Bou Jrir Ghezala 7040", "Cite El Hbess Menzel Jemil 7080", "Ain Ghelal Utique 7013", "Methline Bizerte Sud 7027", "Cite Afh Ghezala 7040", "Cite Ennouzha Menzel Jemil 7080", "Ain Smara Utique 7013", "Ennadhour Bizerte Nord 7029", "Cite Borj Deheb Ghezala 7040", "Cite Ettaffala Menzel Jemil 7080", "El Besbassia Utique 7013", "Fejjet Errih Bizerte Nord 7029", "Cite Rurale Ghezala 7040", "Cite Habib Arifa Menzel Jemil 7080", "El Bhalil Chargui Utique 7013", "Ksar Lahmar Bizerte Nord 7029", "Cite Snit Ghezala 7040", "Cite Nouvelle Menzel Jemil 7080", "El Brij Utique 7013", "Marnissa Bizerte Nord 7029", "El Atiba Ghezala 7040", "Menzel Jemil Menzel Jemil 7080", "El Fejja Utique 7013", "Sidi Ahmed Bizerte Nord 7029", "El Garia Ghezala 7040", "Ezzitoune El Alia 7081", "Cite 7 Novembre Ghar El Melh 7014", "Ain El Berda Bizerte Sud 7029", "El Jafna Ghezala 7040", "Khetmine El Alia 7081", "Cite 9 Avril Ghar El Melh 7014", "Ain Jenane Bizerte Sud 7029", "Ghezala Ghezala 7040", "Sidi Ali Chebab El Alia 7093", "Cite El Amen Ghar El Melh 7014", "El Mrazig Bizerte Sud 7029", "Henchir Ettouila Ghezala 7040", "Borj Challouf Bizerte Sud 7094", "Cite El Mourouj Ghar El Melh 7014", "Cite De La Fraternite Mateur 7030", "Laouilia Ghezala 7040", "El Guetma Sejnane 7097", "Cite Khaled Ibn El Walid Ghar El Melh 7014", "Cite De La Gare Mateur 7030", "Oued Ezzitoun Ghezala 7040", "El Garia Ras Jebal Ras Jebel 7098", "Cite Nouvelle Ghar El Melh 7014", "Cite El Manar Mateur 7030", "Ouled El May Ghezala 7040", "El Aousja Ghar El Melh 7014", "Cite El Omrane 1 Mateur 7030", "Louata Bizerte Sud 7041", "Cite El Amel Ras Jebel 7015", "Cite El Omrane 2 Mateur 7030", "Jouaouda Menzel Bourguiba 7042", "Cite Taieb Mhiri Ras Jebel 7015", "Cite El Omrane 3 Mateur 7030", "Bach Hamba Utique 7043", "Rafraf Ras Jebel 7015", "Cite El Omrane 4 Mateur 7030", "Rafraf Plage Ras Jebel 7045", "Cite Independance El Alia 7016", "Cite Ennahdha Mateur 7030", "Henchir El Berna Mateur 7050", "Bizerte Bizerte Nord 7000", "El Alia El Alia 7016", "Cite Ennasr Mateur 7030", "Cite Ben Aleya Menzel Bourguiba 7050", "Cite Ain Mariem Bizerte Nord 7000", "El Hariza El Alia 7016", "Cite Erraja 1 Mateur 7030", "Cite De La Douane Menzel Bourguiba 7050", "Cite Belvedere Bizerte Nord 7000", "Impasse Ezzouhour El Alia 7016", "Cite Erraja 2 Mateur 7030", "Cite La Ruche Menzel Bourguiba 7050", "Cite Bougatfa Bizerte Nord 7001", "Joumine Joumine 7020", "Cite Erraja 3 Mateur 7030", "Cite Nouvelle Menzel Bourguiba 7050", "Cite De La Municipalite Bizerte Nord 7001", "Sayah Joumine 7020", "Cite Essadaka Mateur 7030", "Cite Sidi Yahya Menzel Bourguiba 7050", "Cite Erriadh Bizerte Nord 7001", "Smadah Joumine 7020", "Cite Ezzouhour Mateur 7030", "Menzel Bourguiba Menzel Bourguiba 7050", "Cite Hassen Nouri Bizerte Nord 7001", "Cite Ben Arous Jarzouna 7021", "Cite Khemouma Mateur 7030", "Bizerte Bougatfa Bizerte Nord 7053", "Cite Nouvelle Plage Bizerte Nord 7001", "Cite Bouchoucha 2 Jarzouna 7021", "Cite Montazah Mateur 7030", "Cite Afh Bizerte Nord 7053", "Ksiba Bizerte Nord 7001", "Cite Calyptus Jarzouna 7021", "Cite Snit Mateur 7030", "Cite Ain Meriem Bizerte Nord 7053", "Cite Militaire Bizerte Nord 7002", "Cite Du Soleil Jarzouna 7021", "Cite Zarrouk Mateur 7030", "Cite Bougatfa 2 Bizerte Nord 7053", "Cite Chourouk Sidi Salem Bizerte Nord 7003", "Cite Ennacim Jarzouna 7021", "El Aouana Mateur 7030", "Cite De La Police Bizerte Nord 7053", "Cite De La Sante Bizerte Nord 7003", "Cite Erraja 1 Jarzouna 7021", "Jebel Ichkeul Mateur 7030", "Cite El Korniche 1 Bizerte Nord 7053", "Cite De Paris Bizerte Nord 7003", "Cite Erraja 2 Jarzouna 7021", "Mateur Mateur 7030", "Cite El Korniche 2 Bizerte Nord 7053", "Cite El Hana Bizerte Nord 7003", "Cite Erraja 3 Jarzouna 7021", "Sidi Mansour Mateur 7030", "Cite El Korniche 3 Bizerte Nord 7053", "Cite Ennacim Bizerte Nord 7003", "Cite Errimel Jarzouna 7021", "Sidi Nsir Mateur 7030", "Cite El Morjene 3 Bizerte Nord 7053", "Cite Erraouabi Bizerte Nord 7003", "Cite Errsass Jarzouna 7021", "Souidia Mateur 7030", "Cite El Morjene 4 Bizerte Nord 7053", "Oued El Marj Bizerte Nord 7003", "Cite Escaliers Jarzouna 7021", "Tehent Mateur 7030", "Cite Rafaha 1 Bizerte Nord 7053", "Cite Air Nouvelle Sejnane 7010", "Cite Essadaka Jarzouna 7021", "Tamra Sejnane 7031", "Cite Rafaha 2 Bizerte Nord 7053", "Cite Aouassia Sejnane 7010", "Cite Gabsi Jarzouna 7021", "Ain Faroua Tinja 7032", "Cite Bourguiba Utique 7060", "Cite Commerciale Sejnane 7010", "Cite Hamdoun Jarzouna 7021", "Cite De Le Liberte Tinja 7032", "Cite Chateau D Eau Utique 7060", "Cite Des Mines Sejnane 7010", "Cite Jaziri Jarzouna 7021", "Cite Douar Chatt Tinja 7032", "Cite De La Laiterie Utique 7060", "Cite Des Ouvriers Sejnane 7010", "Cite Lune Jarzouna 7021", "Cite El Fateh Tinja 7032", "Cite De La Poste Utique 7060", "Cite Du Projet Sejnane 7010", "Cite Mohamed Chehimi Jarzouna 7021", "Cite El Fouladh Tinja 7032", "Cite Ejjamaa Utique 7060", "Cite El Bassatine Sejnane 7010", "Cite Nouvelle Jarzouna 7021", "Cite El Khadhraoui Tinja 7032", "Cite Ezzayatine Utique 7060", "Cite El Ghabette Sejnane 7010", "Jarzouna Jarzouna 7021", "Cite Ikbal Tinja 7032", "Cite Houmet Souk Utique 7060", "Cite El Mouasker Sejnane 7010", "Borj El Adouani Mateur 7022", "Cite Sidi Rezig Tinja 7032", "Ghornata Utique 7060", "Cite Essaada Sejnane 7010", "Cite Hached Mateur 7022", "Cite Sprols Tinja 7032", "Lahouidh Utique 7060", "Cite Ezzouhour Sejnane 7010", "Ettaref Mateur 7022", "Cite Zghaba Tinja 7032", "Utique Utique 7060", "Cite Ezzouhour 2 Sejnane 7010", "Henchir El Kahla Mateur 7022", "Kharrata Tinja 7032", "Bizerte Bab Mateur Bizerte Nord 7061", "Cite Ibn Khaldoun Sejnane 7010", "Jabouz Mateur 7022", "Tinja Tinja 7032", "Utique Nouvelle Utique 7063", "Cite Khaled Ibn El Walid Sejnane 7010", "Mateur Hached Mateur 7022", "Bajou Ghar El Melh 7033", "Bou Zaria Bizerte Sud 7064", "Cite Mougaad Sejnane 7010", "Oum Jenna Mateur 7022", "Ghar El Melh Ghar El Melh 7033", "Cite Ain Charchara Ras Jebel 7070", "Cite Sidi Mansour Sejnane 7010", "Sidi Salem Mateur 7022", "Cap Zbib Ras Jebel 7034", "Cite Bir Ezzaarour Ras Jebel 7070", "Cite Taieb Mhiri Sejnane 7010", "Degma Utique 7023", "Metline Ras Jebel 7034", "Cite El Benzarti Ras Jebel 7070", "Dhouahria Sejnane 7010", "El Mabtouh Utique 7023", "Cite Bir Hmem Menzel Jemil 7035", "Cite Ezzayatine Ras Jebel 7070", "El Abebsa Sejnane 7010", "Essakak Utique 7023", "Cite Chamelle Menzel Jemil 7035", "Cite Kaa El Ballout Ras Jebel 7070", "El Hania Sejnane 7010", "Sidi Othman Utique 7023", "Cite Driss Ben Frej Menzel Jemil 7035", "Ras Jebel Ras Jebel 7070", "El Mrifeg Sejnane 7010", "Touibia Ghar El Melh 7024", "Cite El Misk Gabes Sud 6012", "Techine Matmata 6034", "Cite Garde Nationale Mareth 6080", "Cite Militaire Dimassi Gabes Sud 6012", "Ain Tounine Mareth 6035", "Cite Snit Mareth 6080", "Cite Rhouma Gabes Sud 6012", "Cite Populaire Mareth 6036", "El Akhmes Mareth 6080", "Sidi Boulbaba Gabes Sud 6012", "Kettana Mareth 6036", "El Frada Mareth 6080", "Sombat El Hamma 6013", "Cite Ouled Slama Nouvelle Matmata 6044", "Oued El Hajel Mareth 6036", "El Kaouakba Mareth 6080", "Cite Azaiez Gabes Sud 6014", "Dhokara Nouvelle Matmata 6044", "Sidi Slam Mareth 6036", "Graa Beiri Mareth 6080", "Cite De La Famille Gabes Sud 6014", "Douiouira Nouvelle Matmata 6044", "Zrig El Barrania Mareth 6036", "Mareth Mareth 6080", "Cite Des Enseignants Gabes Sud 6014", "Nouvelle Matmata Nouvelle Matmata 6044", "Zrig El Ghandri Mareth 6036", "Mazraa Ben Slama Mareth 6080", "Cite Des Infirmiers Gabes Sud 6014", "Toujane Mareth 6045", "Gabes Republique Gabes Medina 6040", "Mejni Mareth 6080", "Cite El Mzahid Gabes Sud 6014", "Sidi Touati Mareth 6046", "Barguia Gabes Ouest 6041", "Oued El Ghirane Mareth 6080", "Cite El Yasmine Gabes Sud 6014", "Nahal Gabes Ouest 6051", "Chenini Gabes Gabes Ouest 6041", "Ourifen Mareth 6080", "Cite Ennozh Gabes Sud 6014", "Cite Ennacim El Metouia 6052", "Maita Gabes Ouest 6041", "Zmorten Mareth 6080", "Cite Esseptia Gabes Sud 6014", "Cite Essalem El Metouia 6052", "El Akarit El Metouia 6042", "Betahra Mareth 6081", "Cite Ezzouhour 1 Gabes Sud 6014", "Cite Kheireddine El Metouia 6052", "El Hicha El Metouia 6042", "Metouia El Maya El Metouia 6089", "Cite Ezzouhour 2 Gabes Sud 6014", "El Mida El Metouia 6052", "Laffam Nouvelle Matmata 6043", "Bechima El Hamma 6092", "Cite Hached 1 Gabes Sud 6014", "Ouali El Metouia 6052", "Oued El Harika Nouvelle Matmata 6043", "Chenchou El Hamma 6095", "Cite Hached 2 Gabes Sud 6014", "Oudhref El Metouia 6052", "Zaten Beni Zelten Nouvelle Matmata 6043", "Gabes El Hidaya Gabes Medina 6099", "Cite Ibn Khaldoun Gabes Sud 6014", "Tamezrat Matmata 6054", "Zaten Haddej Nouvelle Matmata 6043", "Mtorrech Gabes Sud 6014", "Dekhilet Toujane Mareth 6055", "Bou Sbah Nouvelle Matmata 6044", "Ayoune Ezzerkine Mareth 6015", "Ezzerkine Mareth 6056", "Chobet Chemlali Nouvelle Matmata 6044", "Arram Mareth 6016", "El Hamma Sud El Hamma 6060", "Cite Edechaicha Nouvelle Matmata 6044", "El Hamma El Hamma 6020", "Chatt Essalem Gabes Medina 6061", "Cite El Izdihar Nouvelle Matmata 6044", "Cite El Izdihar Ghannouche 6021", "Cite 26-26 Gabes Medina 6061", "Cite Guedouala Nouvelle Matmata 6044", "Cite Errimel Ghannouche 6021", "Cite El Bled Gabes Medina 6061", "Cite Ettahrir Ghannouche 6021", "Cite El Ftarcha Gabes Medina 6061", "Ghannouche Ghannouche 6021", "Beni Ghilouf El Hamma 6062", "El Mdou Gabes Sud 6022", "Bou Dhafer Matmata 6070", "El Alaya Mareth 6023", "Chouabet Esmaala Matmata 6070", "Ancienne Zraoua Nouvelle Matmata 6024", "Cite El Azezna Matmata 6070", "Nouvelle Zraoua Nouvelle Matmata 6024", "Cite Hafi Rassa Matmata 6070", "Sidi Gnaou Nouvelle Matmata 6024", "Cite Hedi Chaker Matmata 6070", "Cite Ben Kilani Gabes Medina 6000", "Beni Zelten Nouvelle Matmata 6025", "Cite Independance Matmata 6070", "Cite Commerciale Gabes Medina 6000", "El Amra Nouvelle Matmata 6025", "Cite Mohamed Ali Matmata 6070", "Cite Des Oasis Gabes Medina 6000", "Ezzahra Nouvelle Matmata 6025", "Cite Ras El Oued Matmata 6070", "Cite El Hana Gabes Medina 6000", "Mzaten Nouvelle Matmata 6025", "Haddej Matmata 6070", "Cite El Khalij Gabes Medina 6000", "Zarat Mareth 6026", "Ksar Beni Aissa Matmata 6070", "Cite El Korniche Gabes Medina 6000", "Bou Attouche El Hamma 6027", "Matmata Matmata 6070", "Cite El Mansoura Gabes Medina 6000", "El Fejij Menzel Habib 6030", "Taoujout Matmata 6070", "Cite El Ouns Gabes Medina 6000", "El Mida Menzel Habib 6030", "Tijma Matmata 6070", "Cite Mohamed Ali Gabes Medina 6000", "Hejri Menzel Habib 6030", "Zriba Matmata 6070", "El Mouazir Gabes Medina 6000", "Mehamla Menzel Habib 6030", "Gabes Port Gabes Medina 6071", "Gabes Gabes Medina 6000", "Menzel Habib Menzel Habib 6030", "Cite Afh Gabes Sud 6072", "Limaoua Gabes Medina 6000", "Ouali Menzel Habib 6030", "Cite El Ahrach Gabes Sud 6072", "Oued Khelifa Mahmoud Gabes Medina 6000", "Oued Ezzitoun Menzel Habib 6030", "Cite El Guefercha Gabes Sud 6072", "Remathi Gabes Medina 6000", "Ouled Dhaou Menzel Habib 6030", "Cite Snit Gabes Sud 6072", "Gabes Hached Gabes Medina 6001", "Zograta Menzel Habib 6030", "Cite Sprols Gabes Sud 6072", "Cite El Fankar El Metouia 6010", "Bou Chemma Gabes Ouest 6031", "Zrig Gabes Sud 6072", "Cite El Maya El Metouia 6010", "Cite 2 Mars Gabes Ouest 6031", "Ancien Bled Mareth 6080", "Cite El Mrachda El Metouia 6010", "Cite Ettahrir Gabes Ouest 6031", "Azeiza Mareth 6080", "Cite Ennacim El Metouia 6010", "Cite 7 Novembre Gabes Sud 6032", "Betahra Sud Mareth 6080", "Cite Ezzouhour El Metouia 6010", "Cite Bedis Gabes Sud 6032", "Braouka Mareth 6080", "Cite Nehila Farhat El Metouia 6010", "Cite El Wafa Gabes Sud 6032", "Cite Commerciale Mareth 6080", "El Aouinette El Metouia 6010", "Cite Hached Gabes Sud 6032", "Cite Debaba Mareth 6080", "El Imarat El Metouia 6010", "Teboulbou Gabes Sud 6032", "Cite El Amel Mareth 6080", "El Metouia El Metouia 6010", "Cite El Amel Gabes Sud 6033", "Cite El Argoub Mareth 6080", "Oued El Ghram El Metouia 6010", "Cite El Amel 1 Gabes Sud 6033", "Cite El Charfia Mareth 6080", "Cite El Izdihar Gabes Sud 6011", "Cite El Amel 2 Gabes Sud 6033", "Cite El Ghardek1 Mareth 6080", "Cite El Medina Gabes Sud 6011", "Cite El Amel 3 Gabes Sud 6033", "Cite El Ghardek2 Mareth 6080", "Cite Medenine Gabes Sud 6011", "Cite El Amel 4 Gabes Sud 6033", "Cite El Ghardek3 Mareth 6080", "Gabes El Menara Gabes Sud 6011", "Cite El Amel 5 Gabes Sud 6033", "Cite El Hafaya Mareth 6080", "Cite Afh Gabes Sud 6012", "Cite El Amel 6 Gabes Sud 6033", "Cite El Kribia Mareth 6080", "Cite Ancien Militaire Gabes Sud 6012", "Cite El Maarifa Gabes Sud 6033", "Cite El Masla Mareth 6080", "Cite Bidani Gabes Sud 6012", "Cite Ennakhil Gabes Sud 6033", "Cite El Melayha Mareth 6080", "Cite El Hana Boudoura Gabes Sud 6012", "Cite Ennour Gabes Sud 6033", "Cite Ennouzha Mareth 6080", "Bou Blel Belkhir 2135", "Ouled Zid Gafsa Nord 2196", "Cite Ouled Bel Hassen Belkhir 2115", "Boukou Belkhir 2135", "Cite Ouled Ben Jeddou Belkhir 2115", "Haouel El Oued Belkhir 2135", "Cite Ouled Haj Ali Belkhir 2115", "Jebilet El Oust Belkhir 2135", "Cite Ouled Hmida Belkhir 2115", "Ouled Zaied Belkhir 2135", "Cite Ouled Saad Belkhir 2115", "El Akteb Belkhir 2139", "Ouled El Haj Belkhir 2115", "El Ayaicha Belkhir 2139", "El Araria Sned 2116", "Ezzitouna Belkhir 2139", "Jedida Sned 2116", "Jebel Ayaicha Belkhir 2139", "Oum El Aleg Sned 2116", "Redeyef Gare Redeyef 2140", "Zannouche Sned 2116", "Menzel Mimoun Gafsa Nord 2141", "Cite Bayech Gafsa Sud 2100", "Cite De La Gare Redeyef 2120", "Ennadhour Gafsa Sud 2142", "Cite Cherif Gafsa Sud 2100", "Cite De La Poste Redeyef 2120", "Kef Derbi Gafsa Sud 2142", "Cite Des Jeunes Gafsa Sud 2100", "Cite Du Souk Redeyef 2120", "Doualy Gafsa Gafsa Sud 2143", "Cite Des Jeunes 1 Gafsa Sud 2100", "Cite Essouafa Redeyef 2120", "Ouled Bou Saad El Guettar 2145", "Cite Des Jeunes 2 Gafsa Sud 2100", "Cite Ettahrir Redeyef 2120", "Gafsa Aeroport El Ksar 2151", "Cite El Afrane Gafsa Sud 2100", "Cite Hsouna Ben Tahar Redeyef 2120", "Moulares Gare Moulares 2161", "Cite El Kaouafel 1 Gafsa Sud 2100", "Cite Ouled Bou Oune Redeyef 2120", "Erragouba El Ksar 2169", "Cite El Kaouafel 2 Gafsa Sud 2100", "Cite Ouled Majed Redeyef 2120", "Cite Des Jeunes El Mdhilla 2170", "Cite El Kitna Gafsa Sud 2100", "Cite Ouvriere Redeyef 2120", "Cite Ennacim El Mdhilla 2170", "Cite El Moula Gafsa Sud 2100", "Cite Sidi Abdelkader Redeyef 2120", "Cite Essaada El Mdhilla 2170", "Cite Ennouhoudh Gafsa Sud 2100", "Cite Sprols Redeyef 2120", "Cite Ouest El Mdhilla 2170", "Cite Garde Nationale Gafsa Sud 2100", "Cite Trabelsia Redeyef 2120", "Cite Ouvriere 2 El Mdhilla 2170", "Cite Industrielle Gafsa Sud 2100", "Redeyef Redeyef 2120", "Cite Stade Ouvriere Est El Mdhilla 2170", "El Garia Gafsa Sud 2100", "Lala El Ksar 2121", "Jebel Mdhilla El Mdhilla 2170", "Gafsa Gafsa Sud 2100", "Zomra Redeyef Redeyef 2122", "Borj El Mdhilla El Mdhilla 2173", "Cite De La Fraternite Moulares 2110", "Gafsa Cite Ennour Gafsa Sud 2123", "Bir Saad El Guettar 2180", "Cite De La Gare Moulares 2110", "Cite Essourour Gafsa Sud 2124", "Cite Okba El Guettar 2180", "Cite De Le Liberte Moulares 2110", "Bou Omrane El Guettar 2125", "Cite Orbata Est El Guettar 2180", "Cite Des Jeunes Moulares 2110", "Cite Aouled Radhouane Metlaoui 2130", "Cite Orbata Ouest El Guettar 2180", "Cite Des Ouvriers Moulares 2110", "Cite Centrale Metlaoui 2130", "Cite Populaire El Guettar 2180", "Cite El Amel Moulares 2110", "Cite Du Laboratoire Metlaoui 2130", "Cite Populaire Route Gabes El Guettar 2180", "Cite Essoualmia Moulares 2110", "Cite El Amel Metlaoui 2130", "Cite Ennacim Metlaoui 2130", "Cite Sprols El Guettar 2180", "Cite Kouceila Moulares 2110", "Cite Ennasr Metlaoui 2130", "El Amaiem El Guettar 2180", "Cite Marocain Moulares 2110", "Cite Essaada 1 Metlaoui 2130", "El Guettar El Guettar 2180", "Cite Moderne Moulares 2110", "Cite Essaada 2 Metlaoui 2130", "Majni El Guettar 2180", "Cite Okba Ibn Nafaa Moulares 2110", "Cite Essaada Ouest Metlaoui 2130", "Nchiou El Guettar 2181", "Cite Sprols Moulares 2110", "Cite Europeen Metlaoui 2130", "Lortes El Guettar 2183", "Moulares Moulares 2110", "Cite Ezzouhour Metlaoui 2130", "Bahloula Sned 2190", "Tabedit Moulares 2110", "Cite Ezzouhour 1 Metlaoui 2130", "Cite De La Gout Sned 2190", "Cite Bab Ettoub El Ksar 2111", "Cite Ezzouhour 2 Metlaoui 2130", "Cite Des Martyrs Sned 2190", "Cite Batiments El Ksar 2111", "Cite Ezzouhour 3 Metlaoui 2130", "Cite Ennajah Sned 2190", "Cite Ben Doula El Ksar 2111", "Cite Ezzouhour 4 Metlaoui 2130", "Cite Ennasr 1 Sned 2190", "Cite Ben Issaoui El Ksar 2111", "Cite Ibn Khaldoun Metlaoui 2130", "Cite Ennasr 2 Sned 2190", "Cite Ben Slimene El Ksar 2111", "Cite Moderne Metlaoui 2130", "Cite Ennour Sned 2190", "Cite Bouranene El Ksar 2111", "Cite Presidentielle Metlaoui 2130", "Cite Erriadh Sned 2190", "Cite De La Gare El Ksar 2111", "Cite Thelja Metlaoui 2130", "Cite Ezzitouna 1 Sned 2190", "Cite Des Cadres El Ksar 2111", "Metlaoui Metlaoui 2130", "Cite Ezzitouna 2 Sned 2190", "Cite Ecole El Ksar 2111", "Richet Ennaam Metlaoui 2130", "Cite Ezzouhour 1 Sned 2190", "Cite El Ajama El Ksar 2111", "Cite Dhebebnia 1 Sidi Aich 2131", "Cite Ezzouhour 2 Sned 2190", "Cite El Kaouafel El Ksar 2111", "Cite Dhebebnia 2 Sidi Aich 2131", "Cite Taieb Mhiri Sned 2190", "Cite El Khil El Ksar 2111", "Cite Du Lycee Sidi Aich 2131", "Dhoukara Sned 2190", "Cite El Mancher El Ksar 2111", "Cite Ecole Sidi Aich 2131", "El Goussa Sned 2190", "Cite Essouani El Ksar 2111", "Cite Logement Populaire Sidi Aich 2131", "Essmayria Sned 2190", "Cite Ragouba El Ksar 2111", "El Garia Sidi Aich 2131", "Jebel Sned Sned 2190", "El Ksar El Ksar 2111", "Sidi Aich Sidi Aich 2131", "Menzel Chihaoui Sned 2190", "Gafsa Gare El Ksar 2111", "Sidi Aich Est Sidi Aich 2131", "Sned Sned 2190", "Ouled Chrait El Ksar 2111", "Cite El Magroun Metlaoui 2132", "Majoura Sned 2192", "Sbat El Ksar 2111", "El Kaina Metlaoui 2132", "Majourat Eddakhla Sned 2192", "Sidi Ahmed Zarrouk Gafsa Sud 2112", "Metlaoui Mines Metlaoui 2132", "Abdessadok Sned 2193", "Metlaoui Gare Metlaoui 2113", "Gafsa Cite Des Jeunes Gafsa Sud 2133", "El Biadha Sned 2193", "Ouglet Ahmed Moulares 2114", "El Mziraa Metlaoui 2134", "Henchir El Afrah Sned 2193", "Sidi Boubaker Moulares 2114", "Metlaoui Thalja Metlaoui 2134", "Alim Sned 2195", "Belkhir Belkhir 2115", "Baten Zammour Belkhir 2135", "Echabiba Gafsa Nord 2196", "Borj El Haffey Belkhir 2115", "Ouled Hassen Balta Bou Aouene 8116", "Bou Halleb Fernana 8142", "Cite Hedi Ben Hassine Jendouba Nord 8189", "Bellarigia Jendouba Nord 8117", "Cite El Marja Fernana 8142", "Jendouba Nord Jendouba Nord 8189", "Babouch Ain Draham 8121", "Jouaouda Fernana 8142", "El Haouamdia Tabarka 8192", "Cite Cnrps Jendouba 8122", "Badrouna Bou Salem 8143", "Sidi Meskine Oued Mliz 8193", "Essanabel Jendouba 8122", "Hedhil Fernana 8145", "Hakim Oued Mliz 8194", "El Marja Bou Salem 8124", "El Azima Jendouba 8153", "Essaada Jendouba 8195", "Balta Balta Bou Aouene 8126", "El Melga Jendouba 8153", "Mitil Jendouba 8195", "Brirem Tabarka 8127", "Ain Soltane Ghardimaou 8160", "Cite Ettataouer Jendouba 8196", "El Khedhairia Tabarka 8128", "Cite Des Combattants Ghardimaou 8160", "Jaballah Tabarka 8128", "Cite Des Jardins Ghardimaou 8160", "Ain Draham Ain Draham 8130", "Cite El Mayara Ghardimaou 8160", "El Atatfa Ain Draham 8130", "Cite Ennouhoudh 1 Ghardimaou 8160", "Sidi Abdallah Ain Draham 8130", "Cite Ennouhoudh 2 Ghardimaou 8160", "Sidi Mhamed Ain Draham 8130", "Cite Ennouhoudh 3 Ghardimaou 8160", "Souk Essebt Jendouba 8131", "Cite Ennouhoudh 4 Ghardimaou 8160", "Souk Jemaa Jendouba Nord 8132", "Cite Ennouhoudh 5 Ghardimaou 8160", "Ain El Hamraya Ain Draham 8134", "Cite Ennouhoudh 6 Ghardimaou 8160", "El Houmrane Ain Draham 8134", "Cite Ennouhoudh 7 Ghardimaou 8160", "Oued Ezzene Ain Draham 8134", "Cite Erraja Ghardimaou 8160", "Tebainia Ain Draham 8134", "Cite Erraoudha Ghardimaou 8160", "Esseloul Ain Draham 8135", "Cite Essaada 1 Ghardimaou 8160", "Ouled Helal Ain Draham 8135", "Cite Essaada 2 Ghardimaou 8160", "Adissa Ain Draham 8136", "Cite Ezzouhour Ghardimaou 8160", "Hammam Bourguiba Ain Draham 8136", "Cite Ines Ghardimaou 8160", "Rouai Ain Draham 8136", "El Biadha Ghardimaou 8160", "Tegma Ain Draham 8136", "El Feija Ghardimaou 8160", "Ain El Khararib Jendouba 8100", "Argoub Rihane Fernana 8140", "Esraya Ghardimaou 8160", "Ain El Ksir Jendouba 8100", "Betaha Fernana 8140", "Ezzraibia Ghardimaou 8160", "Cite Administrative Jendouba 8100", "Cite Beni Mazen Fernana 8140", "Ghardimaou Ghardimaou 8160", "Cite Ennour 1 Jendouba 8100", "Cite De La Rnta Fernana 8140", "Ouechtata Ghardimaou 8160", "Cite Ennour 2 Jendouba 8100", "Cite El Frajnia Fernana 8140", "Zitounet Oum Lahneche Ghardimaou 8160", "Cite Snit Jendouba 8100", "Cite El Intilaka Fernana 8140", "Ouerguech Ghardimaou 8161", "El Ganara Jendouba 8100", "Cite El Mouftarek Fernana 8140", "Oued El Maaden Ghardimaou 8162", "Jendouba Jendouba 8100", "Cite El Mourouj Fernana 8140", "Beni Mhamed Bou Salem 8170", "Jerif Jendouba Nord 8100", "Cite Ennacim Fernana 8140", "Bou Laaba Bou Salem 8170", "Ain Essnoussi Tabarka 8110", "Cite Essaada Fernana 8140", "Bou Salem Bou Salem 8170", "Cite Chaaouania Tabarka 8110", "Cite Essanaouber Fernana 8140", "Cite 7 Novembre 1 Bou Salem 8170", "Cite Des Arts Tabarka 8110", "Cite Ezzouhour Fernana 8140", "Cite 7 Novembre 2 Bou Salem 8170", "Cite Du Soleil Tabarka 8110", "Cite Oum Kethir Fernana 8140", "Cite 7 Novembre 3 Bou Salem 8170", "Cite Eddachra Tabarka 8110", "Cite Sprols Fernana 8140", "Cite De La Municipalite Bou Salem 8170", "Cite El Mourjene Tabarka 8110", "Cite Erriadh Tabarka 8110", "Echtaibia Fernana 8140", "Cite Diamonta Bou Salem 8170", "Cite Kraimia Tabarka 8110", "Ejouablia Fernana 8140", "Cite El Bhairia Bou Salem 8170", "Cite Taieb Mhiri Tabarka 8110", "El Alayeg Fernana 8140", "Cite El Hafsia Bou Salem 8170", "El Farech Tabarka 8110", "El Fazzen Fernana 8140", "Cite El Hana Bou Salem 8170", "Sidi Rouine Tabarka 8110", "El Fejouj Fernana 8140", "Cite El Khalij Bou Salem 8170", "Tabarka Tabarka 8110", "El Haouamd Fernana 8140", "Cite Ennour Bou Salem 8170", "Cite Ezzouhour Jendouba 8111", "El Houjjaj Fernana 8140", "Cite Erriadh Bou Salem 8170", "Ben Bechir Jendouba Nord 8111", "El Magroun Fernana 8140", "Cite Essourour Bou Salem 8170", "Ain Essobh Tabarka 8112", "Eroouaba Fernana 8140", "Cite Fatouma Bourguiba Bou Salem 8170", "Bou Terfes Tabarka 8112", "Essmaibia Fernana 8140", "Cite Hached Bou Salem 8170", "Cite Populaire 1 Tabarka 8112", "Fernana Fernana 8140", "Cite Hedi Khelil Bou Salem 8170", "Cite Populaire 2 Tabarka 8112", "Grioua Fernana 8140", "Cite Hopital Bou Salem 8170", "Cite Populaire 3 Tabarka 8112", "Halima Fernana 8140", "Cite Khzama 1 Bou Salem 8170", "Cooperative Centrale Des Grandes Cultures Tabarka 8112", "Oued Gherib Fernana 8140", "Cite Khzama 2 Bou Salem 8170", "Ouled Yahya Tabarka 8112", "Ouled Mfedda Fernana 8140", "Cite Lamine Bou Salem 8170", "Ras Errajel Tabarka 8112", "Rabia Fernana 8140", "Cite Marche Municipal Bou Salem 8170", "Sidi Asker Tabarka 8112", "Rmila Fernana 8140", "Cite Sprols Bou Salem 8170", "Touajnia Tabarka 8112", "Sidi Ammar Fernana 8140", "Cite Zone Industrielle Bou Salem 8170", "Beni Mtir Fernana 8114", "Sidi Said Fernana 8140", "El Aouaoudha Bou Salem 8170", "Cite Essalah Fernana 8114", "Zaaroura Fernana 8140", "Essoumrane Bou Salem 8173", "Cite El Ayachi Oued Mliz 8115", "Bou Hertma Fernana 8141", "Tabarka Aeroport Tabarka 8181", "Oued Mliz Oued Mliz 8115", "Jentoura Fernana 8141", "Edkhailia Oued Mliz 8185", "Bou Aouene Balta Bou Aouene 8116", "Ain Charchara Fernana 8142", "Cite El Ouns Jendouba Nord 8189", "Cite Jebil Balta Bou Aouene 8116", "Ain El Beya Fernana 8142", "Cite Ezzahoua Jendouba Nord 8189", "Sidi Abdallah  Belhaj Chebika 3121", "Messiouta El Ala 3154", "Ksar Lamsa Oueslatia 3124", "Ain Majouna Hajeb El Ayoun 3160", "El Alem Sbikha 3125", "Cite 7 Novembre Hajeb El Ayoun 3160", "Jehina Bou Hajla 3126", "Cite Ennasr Hajeb El Ayoun 3160", "Cite El Hajjam Kairouan Nord 3129", "Cite Ennouhoudh Hajeb El Ayoun 3160", "Ain El Ghrab Haffouz 3130", "Cite Errouki Hajeb El Ayoun 3160", "Cherichira Haffouz 3130", "Cite Essaada Hajeb El Ayoun 3160", "Cite Le Mourouj Haffouz 3130", "Cite Ezzayatine Hajeb El Ayoun 3160", "El Alia Haffouz 3130", "Cite Ezzouhour Hajeb El Ayoun 3160", "El Aoudid Haffouz 3130", "Cite Independance Hajeb El Ayoun 3160", "Ezzorg Haffouz 3130", "El Ghouiba Hajeb El Ayoun 3160", "Haffouz Haffouz 3130", "El Manar Hajeb El Ayoun 3160", "Kairouan Sud Kairouan Sud 3131", "El Menassa Hajeb El Ayoun 3160", "Dar Ben Aicha Sbikha 3132", "Hajeb El Ayoun Hajeb El Ayoun 3160", "Dar Jamiya Sbikha 3132", "Hajeb El Ayoun Gare Hajeb El Ayoun 3160", "El Aouitha Sbikha 3132", "Ouled Abbes Hajeb El Ayoun 3160", "Sisseb Sbikha 3132", "Ouled Ameur Hajeb El Ayoun 3160", "Ain El Beydha Chebika 3133", "Thallaja Hajeb El Ayoun 3160", "Cite El Moez Kairouan Sud 3100", "El Karma Chebika 3133", "El Aouamria Chebika 3161", "Cite Militaire Ancien Kairouan Sud 3100", "Ouled Khalfallah Chebika 3133", "El Ajabna Nasrallah 3170", "Cite Rim Kairouan Sud 3100", "Ouled Khelif Chebika 3133", "El Ksour Nasrallah 3170", "Cite Sabri Kairouan Sud 3100", "Ouled Nasser Chebika 3133", "Nasrallah Nasrallah 3170", "El Argoub Lahrech Kairouan Sud 3100", "Khit El Oued Haffouz 3134", "El Kabbara Nasrallah 3171", "El Makhsouma Kairouan Sud 3100", "Ain Boumourra Sbikha 3135", "Erragouba El Hamra Nasrallah 3173", "El Mrazig Kairouan Sud 3100", "Kairouan Kairouan Sud 3100", "Cite Dar El Amen Kairouan Nord 3140", "Bir Lahjar Bou Hajla 3180", "Chorfa Sbikha 3110", "Cite El Baloui 1 Kairouan Nord 3140", "Bou Hajla Bou Hajla 3180", "Chougafia Sbikha 3110", "Cite El Baloui 2 Kairouan Nord 3140", "Cite 7 Novembre Bou Hajla 3180", "Daloussi Sbikha 3110", "Cite El Baloui 3 Kairouan Nord 3140", "Cite De La Republique Bou Hajla 3180", "Eddikhila Sbikha 3110", "Cite Ichbilia Kairouan Nord 3140", "Cite El Moez Bou Hajla 3180", "El Friouette Sbikha 3110", "Cite Okba Kairouan Nord 3140", "Cite Ennasr Bou Hajla 3180", "El Gatifa Sbikha 3110", "Cite Ouled Manaa Kairouan Nord 3140", "Cite Ennour Bou Hajla 3180", "El Gfey Sbikha 3110", "Cite Sahbi 3 Kairouan Nord 3140", "Cite Essaada Bou Hajla 3180", "El Khodher Sbikha 3110", "Cite Sahbi 4 Kairouan Nord 3140", "Cite Ezzouhour Bou Hajla 3180", "Oued Nebhana Sbikha 3110", "Cite Sahbi 5 Kairouan Nord 3140", "Cite Nouvelle Bou Hajla 3180", "Sbikha Sbikha 3110", "Cite Sahnoun Kairouan Nord 3140", "Cite Okba Bou Hajla 3180", "El Moutbasta Kairouan Nord 3111", "Cite Snit Kairouan Nord 3140", "El Fateh Bou Hajla 3180", "Ben Salem Chebika 3112", "Dhraa Ettammar Kairouan Nord 3140", "Ennasr Bou Hajla 3180", "Gragaya Chebika 3112", "Kairouan Okba Kairouan Nord 3140", "Ouled Achour Bou Hajla 3180", "Hammed Chebika 3112", "Sidi Dhameni Kairouan Nord 3140", "Bir Eddaoula Bou Hajla 3181", "Ain Jelloula Oueslatia 3113", "El Baten Kairouan Nord 3142", "Cite Ennasr Kairouan Nord 3182", "El Hamidette Nasrallah 3114", "Ain El Khazzazia Kairouan Sud 3143", "Abida Cherguia Chebika 3183", "Menzel Mhiri Nasrallah 3114", "Ouled Farjallah Cherarda 3145", "Raccada Kairouan Sud 3191", "Touila Nasrallah 3114", "Ain Sayada El Ala 3150", "Argoub El Khadhra Kairouan Sud 3192", "Sidi Saad Nasrallah 3115", "Cite Essanaouber El Ala 3150", "El Khadhra Kairouan Sud 3192", "Cheraitia Cherarda 3116", "Cite Nouvelle El Ala 3150", "El Ghabette Kairouan Nord 3193", "Cherarda Cherarda 3116", "Cite Ouled Ahmed El Ala 3150", "Dhriaat Sbikha 3194", "Cite El  Mached Cherarda 3116", "Cite Populaire El Ala 3150", "Sidi Messaoud Sbikha 3195", "Cite El Koucha Cherarda 3116", "Cite Rezagnia El Ala 3150", "Hendi Zitouna Sbikha 3196", "El Aouyed Cherarda 3116", "Cite Rurale El Ala 3150", "Cite Tabene Kairouan Sud 3198", "El Ksour Cherarda 3116", "Ecole Ettoual El Ala 3150", "El Borji Kairouan Sud 3198", "Ain Mastour Oueslatia 3120", "Ecole Jouamia El Ala 3150", "Cite Ibn El Jazzar Kairouan Sud 3199", "Cite Bou Assida Oueslatia 3120", "Ecole Trazza El Ala 3150", "Cite Chebbi Oueslatia 3120", "El Ala El Ala 3150", "Cite Commerciale Oueslatia 3120", "El Fjejria El Ala 3150", "Cite Des Ouvriers Oueslatia 3120", "Ghidhifette El Ala 3150", "Cite Du Stade Oueslatia 3120", "Oued El Jabbes El Ala 3150", "Cite Ejjamaa Oueslatia 3120", "Ouled Ali El Ala 3150", "Cite Essanaouber Oueslatia 3120", "Ouled Ennaguez El Ala 3150", "Cite Ettahrir Oueslatia 3120", "Ouled Mehrez El Ala 3150", "Oued El Guessab Oueslatia 3120", "Sayada Nord El Ala 3150", "Oueslatia Oueslatia 3120", "Sayada Sud El Ala 3150", "Chebika Chebika 3121", "Zaafrana Kairouan Sud 3151", "Cite Sabrine Chebika 3121", "Bir Ahmed Bou Hajla 3152", "Rouissette Chebika 3121", "El Msaid El Ala 3153", "El Garaa Sbeitla 1250", "El Adhira Foussana 1220", "El Gharadek Sbeitla 1250", "El Brika Foussana 1220", "El Gounna Sbeitla 1250", "Essatour Foussana 1220", "El Hammar Sbeitla 1250", "Foussana Foussana 1220", "Mghila Sbeitla 1250", "Ouled Boughanem Foussana 1220", "Sbeitla Sbeitla 1250", "Ouled Mansour Foussana 1220", "Echraya Sbeitla 1251", "Ouled Zid Foussana 1220", "Errahayet Sbeitla 1252", "Oum Lahouadh Foussana 1220", "Bou Laaba Kasserine Nord 1253", "Cite El Bassatine Haidra 1221", "Zaouiet Ben Ammar Sbeitla 1254", "Cite El Fateh Haidra 1221", "Oued Miou Sbeitla 1255", "Cite El Intilaka Haidra 1221", "Henchir El Assal Sbeitla 1256", "Cite Ennasr Haidra 1221", "Thala Sud Thala 1261", "Cite Ettadhamen Haidra 1221", "Cite Essourour Sbeitla 1263", "Cite Ibn Charef Haidra 1221", "Cite Air Nouvelle Sbiba 1270", "Cite Ouled Ounallah Haidra 1221", "Cite Des Rouines Romaines Sbiba 1270", "El Mrira Haidra 1221", "Cite Du Lycee Sbiba 1270", "Errmila Haidra 1221", "Cite Eddamous Sbiba 1270", "Essri Haidra 1221", "Cite El Fateh Sbiba 1270", "Gargara Haidra 1221", "Cite El Khadhra 1 Sbiba 1270", "Haidra Haidra 1221", "Cite El Khadhra 2 Sbiba 1270", "Tebaga Haidra 1221", "Cite Ennakhla Sbiba 1270", "Doughra Kasserine Nord 1200", "Sahraoui Foussana 1222", "Cite Erriadh Sbiba 1270", "Kasserine Kasserine Nord 1200", "Cekhirate Feriana 1223", "Cite Essalama Sbiba 1270", "Magdoudech Kasserine Nord 1200", "Eddachra Thala 1224", "Cite Ezzouhour Sbiba 1270", "Chafai Thala 1210", "El Ajred Haidra 1225", "Dhraa Sbiba 1270", "Cite Ain Ahmed Thala 1210", "Barrouka Mejel Bel Abbes 1226", "El Hasnaoui Sbiba 1270", "Cite Bain Maure Ben Azouz Thala 1210", "Kasserine Nour Kasserine Nord 1230", "Kounbitra Sbiba 1270", "Cite Ben Cherif Thala 1210", "Sidi Shil Thala 1231", "Ouljet Aguil Sbiba 1270", "Cite Des Ouvriers Thala 1210", "Bou Deryes Foussana 1232", "Sbiba Sbiba 1270", "Cite Du Battoire Thala 1210", "Bou Zguem Kasserine Sud 1233", "Themed Sbiba 1270", "Cite El Borni Thala 1210", "El Grine El Ayoun 1234", "Ain Khemaissia Sbiba 1271", "Cite El Mhiri Thala 1210", "Zelfane Thala 1235", "Sidi Brahim Ezzaher Sbiba 1273", "Cite Ennadhour Thala 1210", "Cite Ouvriere Kasserine Nord 1237", "Kassernie Ezzouhour Ezzouhour  (Kasserine) 1279", "Cite Errahba Thala 1210", "Cite Cheab Feriana 1240", "Ain Oum Jdour Jediliane 1280", "Cite Garde Nationale Thala 1210", "Cite Du Battoire Feriana 1240", "Cite 7 Novembre Jediliane 1280", "Cite Khazna Jedida Thala 1210", "Cite El Izdihar Feriana 1240", "Cite El Intilaka Jediliane 1280", "Cite Mongi Slim Thala 1210", "Cite Hached Feriana 1240", "Cite Ettaamir Jediliane 1280", "Cite Snit Thala 1210", "Cite Hardoub Feriana 1240", "Cite Ezzouhour Jediliane 1280", "Henchir Goumria Thala 1210", "Cite Pierre Noire Feriana 1240", "Frej Terbah Jediliane 1280", "Ouled Ghida Thala 1210", "Feriana Feriana 1240", "Jediliane Jediliane 1280", "Thala Thala 1210", "Oum Ali Feriana 1240", "Ain El Hmadna Jediliane 1281", "Bou Lahnech Thala 1211", "Hassi El Frid Hassi El Frid 1241", "Ain Eddefla Haidra 1285", "Khemouda Foussana 1212", "Lahouache Feriana 1242", "Garaat Ennaam Feriana 1243", "Garaat Ennadhour Mejel Bel Abbes 1293", "Bou Chebka Feriana 1213", "El Kamour Hassi El Frid 1245", "El Fekka Mejel Bel Abbes 1294", "Cite Commerciale Mejel Bel Abbes 1214", "Khanguet El Jazia Hassi El Frid 1247", "Cite Des Martyrs Mejel Bel Abbes 1214", "Cite Des Enseignants Sbeitla 1250", "Cite Du Lycee Mejel Bel Abbes 1214", "Cite Dhraa Bou Ouaj Sbeitla 1250", "Cite Eddachra 1 Mejel Bel Abbes 1214", "Cite Du Lycee Sbeitla 1250", "Cite Eddachra 2 Mejel Bel Abbes 1214", "Cite Du Stade Sbeitla 1250", "Cite El Guerayria Mejel Bel Abbes 1214", "Cite El Fateh Sbeitla 1250", "Cite Nouvelle 1 Mejel Bel Abbes 1214", "Cite El Ghabette Sbeitla 1250", "Cite Nouvelle 2 Mejel Bel Abbes 1214", "Cite El Khadhra Sbeitla 1250", "Cite Populaire Mejel Bel Abbes 1214", "Cite El Oulja Sbeitla 1250", "Henchir Oum El Khir Mejel Bel Abbes 1214", "Cite Errahba Sbeitla 1250", "Mejel Bel Abbes Mejel Bel Abbes 1214", "Cite Essourour Echergui Sbeitla 1250", "Ouled Marzoug Mejel Bel Abbes 1214", "Cite Essourour El Gharbi Sbeitla 1250", "Thelepte Feriana 1215", "Cite Ezzayatine Sbeitla 1250", "El Ayoun El Ayoun 1216", "Cite Hopital Sbeitla 1250", "Ain Janan Foussana 1220", "Cite Huillerie Sbeitla 1250", "Cite Bou Lila Foussana 1220", "Cite Industrielle Sbeitla 1250", "Cite El Bassatine Foussana 1220", "Cite Militaire 1 Sbeitla 1250", "Cite El Fateh Foussana 1220", "Cite Militaire 2 Sbeitla 1250", "Cite El Intilaka Foussana 1220", "Cite Militaire 3 Sbeitla 1250", "Cite Erriadh Foussana 1220", "Fatnassa Souk El Ahad 4223", "Bazma Kebili Sud 4224", "Gliaa Souk El Ahad 4230", "Jazira Souk El Ahad 4230", "Jazira El Baiida Souk El Ahad 4230", "Menchia Souk El Ahad 4230", "Souk El Ahad Souk El Ahad 4230", "Zaouiet El Harth Souk El Ahad 4230", "Bechri Souk El Ahad 4231", "Tenbib Kebili Nord 4232", "Rabta Kebili Nord 4233", "Cite 7 Novembre Douz 4234", "Cite Commerciale Douz 4234", "Cite Des Oasis Douz 4234", "Cite El Izdihar Douz 4234", "Cite El Ouroud Douz 4234", "Cite Ennour Douz 4234", "Cite Essaada Douz 4234", "Cite Ezzouhour Douz 4234", "Cite Ibn Khaldoun Douz 4234", "Golaa Douz 4234", "Tombar Kebili Nord 4235", "Bou Abdallah Souk El Ahad 4236", "Telmine Kebili Nord 4237", "Janaoura Kebili Sud 4242", "Blidette Kebili Sud 4243", "Barghouthia Kebili Sud 4253", "Bechelli Kebili Sud 4253", "Kelouemen Kebili Sud 4253", "Cite Jelaila Douz 4260", "Cite Ouled Oun Douz 4260", "Douz Douz 4260", "Ghelissia Douz 4260", "Ksar Ghilene Douz 4260", "Zaafrane Douz 4261", "Jersine Kebili Sud 4263", "Beni Mhamed Kebili Sud 4200", "Cite El Houda El Faouar 4264", "Cite Afh Kebili Sud 4200", "Cite El Moustakbel El Faouar 4264", "Cite Du Lycee Kebili Sud 4200", "Cite Ennour El Faouar 4264", "Cite Militaire Kebili Sud 4200", "Cite Essalem El Faouar 4264", "El Gataya Kebili Sud 4200", "El Faouar El Faouar 4264", "El Msaid Kebili Sud 4200", "Gherib El Faouar 4264", "Kebili Kebili Sud 4200", "Ghidma El Faouar 4264", "Mazraa Neji Kebili Sud 4200", "Sabria El Faouar 4264", "Oum El Farth Kebili Sud 4200", "Staftimi Kebili Nord 4273", "Radhouane Kebili Sud 4200", "Limaguez Kebili Nord 4274", "Rejime Maatoug El Faouar 4210", "Kebili Beyez Kebili Nord 4280", "Rahmet Kebili Sud 4211", "Chouchet Negga Souk El Ahad 4283", "Oum Somaa Souk El Ahad 4212", "Negga Souk El Ahad 4283", "Zaouiet El Anes Souk El Ahad 4213", "El Mansoura Kebili Nord 4293", "Jemna Kebili Sud 4214", "Jedida Kebili Nord 4293", "Cite Douz Chargui Douz 4215", "Toura Mansoura Kebili Nord 4293", "Cite El Abadla Douz 4215", "Saidane Kebili Nord 4294", "Cite Populaire Douz 4215", "Douz Chargui Douz 4215", "Cite Ben Hamroun Douz 4216", "Cite El Athemna Douz 4216", "Cite Ouled Abdallah Douz 4216", "Cite Ouled Amor Douz 4216", "Douz Aouina Douz 4216", "El Aouina Douz 4216", "Bechni Douz 4222", "Eddorgine Douz 4222", "Nouaiel Douz 4222", "Cite Ezzitouna Tajerouine 7150", "Sidi Baraket Nord Dahmani 7170", "Salah El Bahri Le Kef Est 7100", "Cite 8 Fevrier 1 Sakiet Sidi Youssef 7120", "Cite Habib Thameur Tajerouine 7150", "Sidi Baraket Sud Dahmani 7170", "Semana Le Kef Est 7100", "Cite 8 Fevrier 2 Sakiet Sidi Youssef 7120", "Cite 8 Fevrier 3 Sakiet Sidi Youssef 7120", "Cite Hopital Tajerouine 7150", "Zouarine Dahmani 7170", "Sidi Mansour Le Kef Est 7100", "Cite Des Ouvriers Sakiet Sidi Youssef 7120", "Cite Jebel Tajerouine 7150", "Bir Heddi Le Sers 7180", "Zone Industrielle Le Kef Est 7100", "Cite El Intilaka Sakiet Sidi Youssef 7120", "Cite Taieb Mhiri Tajerouine 7150", "Bou Sliaa Le Sers 7180", "Ain El Henchir Nebeur 7110", "Cite El Kerfeh Sakiet Sidi Youssef 7120", "El Hodh Tajerouine 7150", "Cite Du Pont Le Sers 7180", "Cite Ennasr Nebeur 7110", "Cite Ennour 1 Sakiet Sidi Youssef 7120", "Garn El Halfaya Tajerouine 7150", "Cite El Bassatine Le Sers 7180", "Cite Hadj Ahmed Nebeur 7110", "Cite Ennour 2 Sakiet Sidi Youssef 7120", "La Gare Tajerouine 7150", "Cite Ennacim Le Sers 7180", "Cite Nouvelle Nebeur 7110", "Cite Ettahrir Sakiet Sidi Youssef 7120", "Sidi Abdelbasset Tajerouine 7150", "Cite Ennour Le Sers 7180", "Nebeur Nebeur 7110", "Cite Moniments Sakiet Sidi Youssef 7120", "Tajerouine Tajerouine 7150", "Cite Ennour 2 Le Sers 7180", "Zone Industrielle Nebeur 7110", "Cite Sakmo Sakiet Sidi Youssef 7120", "Tajerouine Gare Tajerouine 7150", "Cite Ennouzha Le Sers 7180", "Oued Mellegue Nebeur 7111", "Cite Sprols Sakiet Sidi Youssef 7120", "Menzel Salem Tajerouine 7151", "Cite Erriadh Le Sers 7180", "Bir Ben Cherifa Touiref 7112", "Essakia Sakiet Sidi Youssef 7120", "Jazza Tajerouine 7153", "Cite Essanaouber Le Sers 7180", "Cite El Izdihar Touiref 7112", "Farchen Sakiet Sidi Youssef 7120", "Ain El Fedhil El Ksour 7160", "Cite Ezzouhour Le Sers 7180", "Cite Ennour Touiref 7112", "Jeradou Sakiet Sidi Youssef 7120", "Ain Ksiba El Ksour 7160", "El Argoub Le Sers 7180", "Cite Essaada Touiref 7112", "La Mine Sakiet Sidi Youssef 7120", "Banou El Ksour 7160", "El Mellaha Le Sers 7180", "Gargour Touiref 7112", "Place De La Republique Sakiet Sidi Youssef 7120", "Cite Ali El Bahloul El Ksour 7160", "Elles Le Sers 7180", "Ladhieb Touiref 7112", "Sidi Rabeh Sakiet Sidi Youssef 7120", "Cite Attouche El Ksour 7160", "Labar Le Sers 7180", "Mellala Touiref 7112", "Tabia Sakiet Sidi Youssef 7120", "Cite Centre Ville El Ksour 7160", "Le Sers Le Sers 7180", "Ouljet Essedra Touiref 7112", "Borj El Aifa Le Kef Est 7122", "Cite El Borj El Ksour 7160", "Le Vieux Sers Le Sers 7180", "Touiref Touiref 7112", "Sidi Ahmed Essalah Kalaa El Khasba 7123", "Cite El Hella El Ksour 7160", "Lorbous Le Sers 7180", "Cite El Mellessine Kalaa El Khasba 7113", "Ain El Karma Sakiet Sidi Youssef 7125", "Cite Essaada El Ksour 7160", "Barnoussa Le Kef Est 7100", "Lorbous Gare Le Sers 7180", "Cite Errouka Kalaa El Khasba 7113", "Cite Bourguiba Kalaat Sinane 7130", "Cite Mohamed Ali El Ksour 7160", "Bou Meftah Le Kef Est 7100", "Sidi Nasser Le Sers 7180", "Cite Essouitir Kalaa El Khasba 7113", "Cite Du Jardin Kalaat Sinane 7130", "Cite Safia 1 El Ksour 7160", "Cite 1Er Mai Le Kef Est 7100", "Tricha Le Sers 7180", "Kalaa El Khasba Kalaa El Khasba 7113", "Cite Du Stade Kalaat Sinane 7130", "Cite Safia 2 El Ksour 7160", "Cite 2 Mars Le Kef Est 7100", "Oued Souani Le Kef Est 7194", "Ain El Garsa Jerissa 7114", "Cite El Bassatine Kalaat Sinane 7130", "Cite Sidi Ali Mahjoub El Ksour 7160", "Cite 3 Aout Le Kef Est 7100", "Cite Ahmed Tlili Jerissa 7114", "Cite Ennacim Kalaat Sinane 7130", "Cite Sidi Mansour El Ksour 7160", "Cite 7 Novembre Le Kef Est 7100", "Cite Ali Ben Ghedhahom Jerissa 7114", "Cite Ennour Kalaat Sinane 7130", "Echaabna El Ksour 7160", "Cite Ain Mnekh Le Kef Est 7100", "Cite Ali Ben Khlifa Jerissa 7114", "Cite Essanabel Kalaat Sinane 7130", "Eddhila El Ksour 7160", "Cite Ammar Ayari Le Kef Est 7100", "Cite Bourguiba Jerissa 7114", "Cite Essanaouber Bou Arara Kalaat Sinane 7130", "El Afset El Ksour 7160", "Cite Bahri Barbouche Le Kef Est 7100", "Cite Chahid El Aid 1 Jerissa 7114", "Cite Ezzouhour Bou Arara Kalaat Sinane 7130", "El Hmarna El Ksour 7160", "Cite Bayedh Le Kef Est 7100", "Cite Chahid El Aid 2 Jerissa 7114", "Cite Mongi Slim Kalaat Sinane 7130", "El Houilat El Ksour 7160", "Cite Bir Thelj Le Kef Est 7100", "Cite De La Gare Jerissa 7114", "Cite Yougharta Kalaat Sinane 7130", "El Ksour El Ksour 7160", "Cite Bourayou Le Kef Est 7100", "Cite Des Ingenieurs Jerissa 7114", "El Felta Kalaat Sinane 7130", "Kirata El Ksour 7160", "Cite Cherichi Le Kef Est 7100", "Cite Des Instituteurs Jerissa 7114", "Errebiba Kalaat Sinane 7130", "Louata El Ksour 7160", "Cite De La Gare Le Kef Est 7100", "Cite Des Martyrs Jerissa 7114", "Kalaat Sinane Kalaat Sinane 7130", "Ouled Bouraoui El Ksour 7160", "Cite De La Liberte Le Kef Est 7100", "Cite Des Ouvriers Jerissa 7114", "Safsaf Kalaat Sinane 7130", "Ouled Ghana El Ksour 7160", "Cite Des Enseignants Le Kef Est 7100", "Cite Du Souk Jerissa 7114", "Sidi Khiar Nebeur 7131", "Ouled Zid El Ksour 7160", "Cite Eddyr Le Kef Est 7100", "Cite Echahid Belgacem Jerissa 7114", "Mahjouba Tajerouine 7132", "Abida Dahmani 7170", "Cite El Bassatine Le Kef Est 7100", "Cite Echahid Sadok Jerissa 7114", "Sidi Mtir Tajerouine 7133", "Adissi Dahmani 7170", "Cite El Farah Le Kef Est 7100", "Cite Errouki Jerissa 7114", "Zaafrane Le Kef Est 7134", "Ain Meskhia Dahmani 7170", "Cite El Hana Le Kef Est 7100", "Cite Essaada Jerissa 7114", "Ain Sinan Kalaat Sinane 7135", "Charket Essaboun Dahmani 7170", "Cite El Izdihar Le Kef Est 7100", "Cite Essanaouber Ancienne Jerissa 7114", "Bou Jabeur Kalaat Sinane 7136", "Cite 1 Mai 1 Dahmani 7170", "Cite El Ouns Le Kef Est 7100", "Cite Essanaouber Nouvelle Jerissa 7114", "Tell Ghouzlane Nebeur 7141", "Cite 1 Mai 2 Dahmani 7170", "Cite Ennacim Le Kef Est 7100", "Cite Essarouel Jerissa 7114", "Cite 2 Mars Tajerouine 7150", "Cite 2 Mars 1 Dahmani 7170", "Cite Ennouhoudh 1 Le Kef Est 7100", "Cite Ettahrir Jerissa 7114", "Cite 7 Novembre Tajerouine 7150", "Cite 2 Mars 2 Dahmani 7170", "Cite Ennouhoudh 2 Le Kef Est 7100", "Cite Ezzouhour Jerissa 7114", "Cite Afh Tajerouine 7150", "Cite Ben Ammar 1 Dahmani 7170", "Cite Erriadh Le Kef Est 7100", "Cite Hached Nord Jerissa 7114", "Cite Ain El Bar Tajerouine 7150", "Cite Ben Ammar 2 Dahmani 7170", "Cite Essaada 1 Le Kef Est 7100", "Cite Hached Sud Jerissa 7114", "Cite Bourguiba 1 Tajerouine 7150", "Cite Ben Hafdhallah Dahmani 7170", "Cite Essaada 2 Le Kef Est 7100", "Cite Mohamed Ali Jerissa 7114", "Cite Bourguiba 2 Tajerouine 7150", "Cite El Azima Dahmani 7170", "Cite Essakhra Le Kef Est 7100", "Cite Mohamed Ali Nlle Jerissa 7114", "Cite Bourguiba 3 Tajerouine 7150", "Cite El Intilak Dahmani 7170", "Cite Ezzitouna Le Kef Est 7100", "Cite Sidi Yahya Jerissa 7114", "Cite Ciok Tajerouine 7150", "Cite Ennasr Dahmani 7170", "Cite Fourati Le Kef Est 7100", "Cite Taieb Mhiri Jerissa 7114", "Cite De La Palestine Tajerouine 7150", "Cite Ennour Dahmani 7170", "Cite Hached Le Kef Est 7100", "El Gorraia Jerissa 7114", "Cite Des Martyrs Tajerouine 7150", "Cite Erriadh Dahmani 7170", "Cite Harrouch Le Kef Est 7100", "El Hayadra Jerissa 7114", "Cite Du Souk Tajerouine 7150", "Cite Essanabel Dahmani 7170", "Cite Ibn Abi Dhiaf Le Kef Est 7100", "Ennaiem Jerissa 7114", "Cite Du Stade Tajerouine 7150", "Cite Essanaouber 1 Dahmani 7170", "Cite Ibn Khaldoun Le Kef Est 7100", "Esbiaat Jerissa 7114", "Cite El Ain Tajerouine 7150", "Cite Essanaouber 2 Dahmani 7170", "Cite Souani Laaneb 1 Le Kef Est 7100", "Fej Ettamr Jerissa 7114", "Cite El Bassatine Tajerouine 7150", "Cite Ettenmia Dahmani 7170", "Cite Souani Laaneb 2 Le Kef Est 7100", "Henchir Sarrat Jerissa 7114", "Cite El Besma 1 Tajerouine 7150", "Cite Hopital Dahmani 7170", "Cite Taieb Mhiri Le Kef Est 7100", "Jerissa Jerissa 7114", "Cite El Besma 2 Tajerouine 7150", "Cite Ibn Khaldoun Dahmani 7170", "Cite Tounsi Arnous Le Kef Est 7100", "Jerissa Gare Jerissa 7114", "Cite El Fouroussia Tajerouine 7150", "Cite Mohamed Ali Dahmani 7170", "Ennaima Le Kef Est 7100", "Oum El Kelil Jerissa 7114", "Cite Errahba Tajerouine 7150", "Cite Sidi Dahmani Dahmani 7170", "Le Kef Le Kef Est 7100", "Ezzitouna El Ksour 7115", "Cite Essakia Tajerouine 7150", "Dahmani Dahmani 7170", "Oued Erraml Le Kef Est 7100", "Bahra Le Kef Est 7116", "Cite Essanaouber Tajerouine 7150", "Sidi Asker Dahmani 7170", "Oued Tessa Le Kef Est 7100", "Kef Ouest Le Kef Ouest 7117", "Cite Des Infirmiers Mahdia 5111", "El Khiour Chorbane 5130", "El Mechelette El Jem 5160", "Ouled Farhat El Jem 5160", "Cite Ennour Mahdia 5111", "Henchir Bouaziz Chorbane 5130", "Sidi Bou Helal El Jem 5160", "Cite Sidi Messaoud Mahdia 5111", "Kheradna Chorbane 5130", "Zeghabna El Jem 5160", "Eddikhila 3 Mahdia 5111", "Maati Cheraf Chorbane 5130", "Cite De La Plage La Chebba 5170", "Mahdia Hiboun Mahdia 5111", "Maati Henchir Bou Aziz Chorbane 5130", "Ferahta La Chebba 5170", "Bou Helal El Ali Nord Bou Merdes 5112", "Ouled Abdennebi Chorbane 5130", "La Chebba La Chebba 5170", "Cite Administrative Bou Merdes 5112", "Ouled Ahmed Chorbane 5130", "Merkez Chaabna La Chebba 5170", "Cite Ghrissine Bou Merdes 5112", "Ouled Cherifa Chorbane 5130", "Cite Commerciale Ksour Essaf 5180", "Cite Jebel Bou Merdes 5112", "Ouled El Hannachi Chorbane 5130", "Cite Dhamene Ksour Essaf 5180", "Cite Rurale Bou Merdes 5112", "Ouled Sghaier Chorbane 5130", "Cite El Bassatine Ksour Essaf 5180", "Cite Snit Bou Merdes 5112", "El Hekaima Mahdia 5131", "Cite El Fatimi Ksour Essaf 5180", "El Aouadhbia Bou Merdes 5112", "Jouaouda Mahdia 5131", "Cite El Malaji Ksour Essaf 5180", "El Melahma Bou Merdes 5112", "Merkez Ouled Dhaouadi Mahdia 5131", "Cite El Wafa Ksour Essaf 5180", "Errebibette Bou Merdes 5112", "Zouaouine Mahdia 5131", "Cite Ezzouhour Ksour Essaf 5180", "Kerker Bou Merdes 5112", "El Bassatine Sidi Alouene 5132", "Cite Salah Ben Ali Ksour Essaf 5180", "Agba Hbira 5113", "Essaada Sidi Alouene 5132", "Ksour Essaf Ksour Essaf 5180", "Chahda Ouest Hbira 5113", "Merkez Ouled Haj Khelifa Sidi Alouene 5132", "Ksour Essaf Hached Ksour Essaf 5189", "Chatt Ouled Ncib Hbira 5113", "Oued Guelat Sidi Alouene 5132", "Baajla Sidi Alouene 5190", "El Hajjara Hbira 5113", "Sakiet El Khadem Sidi Alouene 5132", "Cite Dar El Hadad Sidi Alouene 5190", "Hbira Hbira 5113", "Sidi Ali Ghedir Sidi Alouene 5132", "Sidi Alouene Sidi Alouene 5190", "Regaiga Hbira 5113", "Chahda Chorbane 5133", "Ennouzha Sidi Alouene 5192", "Beni Tourch Melloulech 5114", "Chaara Souassi 5134", "Ouled Aicha Sidi Alouene 5192", "Melloulech Melloulech 5114", "Sidi Zid Souassi 5134", "Zelba Sidi Alouene 5192", "Ouled Abdallah Melloulech 5114", "Neffatia Chorbane 5135", "Zelba El Henchir Sidi Alouene 5192", "Ouled Mabrouk Melloulech 5114", "El Ghedhabna Ksour Essaf 5136", "El Henichette Sidi Alouene 5193", "El Bradaa Ksour Essaf 5115", "El Khmara Ksour Essaf 5136", "El Mejria Sidi Alouene 5193", "El Hessinette Ksour Essaf 5115", "Cite 9 Avril Souassi 5140", "Oued Beja Sidi Alouene 5193", "Ouled Salah Ksour Essaf 5116", "Cite Afh Souassi 5140", "Cite Essaada Mahdia 5199", "Sidi Assaker Ksour Essaf 5116", "Cite Commerciale Souassi 5140", "Cite Essalem Mahdia 5199", "El Houd Melloulech 5117", "Cite Ettaamir Souassi 5140", "Mahdia Ezzahra Mahdia 5199", "El Mansoura Melloulech 5117", "Cite Ezzouhour Souassi 5140", "Ouled Jaballah Melloulech 5117", "Cite Ibn Khaldoun Souassi 5140", "Bou Slim Ouled Chamakh 5120", "Cite Industrielle Souassi 5140", "El Ajilette Ouled Chamakh 5120", "Cite Populaire Souassi 5140", "El Manaa Ouled Chamakh 5120", "Essetoute Souassi 5140", "El Mharza Est Ouled Chamakh 5120", "Ethouabtia Souassi 5140", "Ouled Bouzid Ouled Chamakh 5120", "Ezzeirate Souassi 5140", "Ouled Chamakh Ouled Chamakh 5120", "Gdarat Souassi 5140", "Somra Ouled Chamakh 5120", "Jemiaat Souassi 5140", "Cite Nouvelle Mahdia 5121", "Ouled Amor Souassi 5140", "Cite Populaire Mahdia 5121", "Ouled Bou Helal Souassi 5140", "Rejiche Mahdia 5121", "Ouled Khelifa Souassi 5140", "Menzel Hached Hbira 5122", "Ouled Moulahoum Souassi 5140", "Chehimet Ouled Chamakh 5123", "Ouled Moulahoum Sud Souassi 5140", "Ouled Amor Ouled Chamakh 5123", "Rejibet Souassi 5140", "El Achaba El Jem 5124", "Sidi Bou Helal Souassi 5140", "Tlelsa El Jem 5124", "Sidi Naceur Nord Souassi 5140", "Touahra El Jem 5124", "Souassi Souassi 5140", "Bou Helal Sud Bou Merdes 5125", "Chiba Mahdia 5141", "Cite Afh Mahdia 5100", "Cite Douira Ksour Essaf 5126", "Jemamla Souassi 5144", "Cite Bourguiba Mahdia 5100", "Cite El Hajeb Ksour Essaf 5126", "El Mansoura Souassi Souassi 5145", "Cite El Moez Mahdia 5100", "Cite El Imarat Ksour Essaf 5126", "Rechercha Ksour Essaf 5146", "Cite Ettaamir Mahdia 5100", "Cite El Menagua Ksour Essaf 5126", "Mahdia Republique Mahdia 5150", "Cite Hached Mahdia 5100", "Cite Populaire Ksour Essaf 5126", "El Braghtia Sidi Alouene 5151", "Cite Taher Sfar Mahdia 5100", "Salakta Ksour Essaf 5126", "Zorda Sidi Alouene 5151", "Mahdia Mahdia 5100", "Essaad Mahdia 5127", "El Aitha El Jem 5153", "Bou Merdes Bou Merdes 5110", "Mahdia Essouk Mahdia 5129", "Ouled El Haj El Jem 5153", "Chouaria Bou Merdes 5110", "Charaf Chorbane 5130", "Riadh Bou Helal El Jem 5153", "El Hous Bou Merdes 5110", "Chorbane Chorbane 5130", "Meharza 18 Hbira 5154", "Ennaima Bou Merdes 5110", "Cite Nouvelle Chorbane 5130", "Ksesba Souassi 5155", "Errouadhi Bou Merdes 5110", "El Bassora Chorbane 5130", "Beni Thabet El Jem 5160", "Menzel Hamza Est Bou Merdes 5110", "El Gouassem Chorbane 5130", "Cite Ibn Sina El Jem 5160", "Menzel Hamza Ouest Bou Merdes 5110", "El Gradha Est Chorbane 5130", "Cite Nouvelle El Jem 5160", "Zerata Bou Merdes 5110", "El Gradha Ouest Chorbane 5130", "El Jem El Jem 5160", "El Mellaha Tebourba 1144", "Cite El Hidaya Jedaida 1124", "Gosset El Bey Tebourba 1144", "Cite Ennajet Jedaida 1124", "Gueffaya Tebourba 1144", "Cite Ennour Jedaida 1124", "Sidi Abdelbasset Tebourba 1144", "Cite Erriadh Jedaida 1124", "Cite Essaroula Jedaida 1124", "Cite Guichba Jedaida 1124", "Cite Habib El Ayari Jedaida 1124", "Cite Hached Jedaida 1124", "Cite Hamdi Jedaida 1124", "Bou Regba Mornaguia 1110", "Cite Hammed Nouvelle Jedaida 1124", "Cite Bir Ben Njima Mornaguia 1110", "Cite Jebel Jedaida 1124", "Cite De La Rtt 3 Mornaguia 1110", "Cite Mokhtar Jedaida 1124", "Cite Toumia Mornaguia 1110", "Cite Najiba Jedaida 1124", "El Hamayem Mornaguia 1110", "Cite Rurale Jedaida 1124", "Ghedaouna Mornaguia 1110", "Cite Sidi Salem Jedaida 1124", "Mornaguia Mornaguia 1110", "Cite Tarek Ibn Zied Jedaida 1124", "Cite Touhami Nefzi Jedaida 1124", "Cite Trabelsi Jedaida 1124", "Aouilia (Km 37) Borj El Amri 1113", "Cite Yougharta Jedaida 1124", "Bir Ettouil Borj El Amri 1113", "El Henna Jedaida 1124", "Borj Ennour Borj El Amri 1113", "Ezzahra Jedaida 1124", "El Messaidine Borj El Amri 1113", "Henchir Dheniba Jedaida 1124", "Cite 7 Novembre El Battan 1114", "Jedaida Jedaida 1124", "Cite Ben Ghenia El Battan 1114", "Cite Brik El Battan 1114", "Cite 7 Novembre Oued Ellil 2021", "Cite El Houda El Battan 1114", "Cite Afh Oued Ellil 2021", "Cite Ennasr El Battan 1114", "Cite Khaled Ibn El Walid Douar Hicher 2086", "Cite Bejoua 2 Oued Ellil 2021", "Cite Ennour El Battan 1114", "Douar Hicher Douar Hicher 2086", "Cite Ben Arfa Oued Ellil 2021", "Cite Ennouzha El Battan 1114", "Cite Ben Jemaa Oued Ellil 2021", "El Battan El Battan 1114", "Argoub Erroumi Tebourba 1130", "Cite Bennour Bejoua 1 Oued Ellil 2021", "El Mansoura 2 El Battan 1114", "Bir Ezzitoun Tebourba 1130", "Cite Bouzid Oued Ellil 2021", "El Mehrine El Battan 1114", "Cite 7 Novembre Tebourba 1130", "Cite Dhamene 2 Oued Ellil 2021", "Ezzouitina El Battan 1114", "Cite Chebbi Tebourba 1130", "Cite El Boustene 1 Oued Ellil 2021", "Ferme NÂ¦7 El Battan 1114", "Cite De France Tebourba 1130", "Cite El Boustene 2 Oued Ellil 2021", "Saint Joseph El Battan 1114", "Cite De La Palestine Tebourba 1130", "Cite El Izdihar Bejoua Oued Ellil 2021", "Cite El Argoub Tebourba 1130", "Cite El Moezzia Oued Ellil 2021", "Sidi Ali El Hattab Mornaguia 2071", "Cite El Bassatine Tebourba 1130", "Cite El Moultaka 1 Oued Ellil 2021", "Cite El Kef Lahmar Tebourba 1130", "Cite Ettourjmene Oued Ellil 2021", "Cite El Kharrouba Tebourba 1130", "Cite Marseille Oued Ellil 2021", "Cite El Malja Tebourba 1130", "Cite Militaire Oued Ellil 2021", "Cite El Malja Hamra Tebourba 1130", "Oued Ellil Oued Ellil 2021", "Cite El Mandra Tebourba 1130", "Cite El Mellassine Tebourba 1130", "Cite Ennajah Tebourba 1130", "Borj El Amri Borj El Amri 1142", "Cite Erraja Tebourba 1130", "Cite El Hafsia Borj El Amri 1142", "Cite Errimel Tebourba 1130", "Cite El Intilaka Borj El Amri 1142", "Cite Essaada Tebourba 1130", "Cite Essaada 2 Tebourba 1130", "Cite El Manai Borj El Amri 1142", "Cite Khelif Jalled Tebourba 1130", "Cite Ennouzha 1 Borj El Amri 1142", "Cite Laroussia Tebourba 1130", "Cite Ennouzha 2 Borj El Amri 1142", "Mornaguia 20 Mars Mornaguia 1116", "Cite Populaire Tebourba 1130", "Cite Taoufik Borj El Amri 1142", "Cite Route Chouigui Tebourba 1130", "Drijette Borj El Amri 1142", "Cite Souyah Tebourba 1130", "Enfaiedh Borj El Amri 1142", "La Mannouba Mannouba 2010", "El Aroussia Tebourba 1130", "Ksar Hadid Borj El Amri 1142", "Denden Mannouba 2011", "Goumriane Tebourba 1130", "Menzel Habib Borj El Amri 1142", "El Habibia Jedaida 2012", "El Mansoura Jedaida 2075", "Tebourba Tebourba 1130", "Teboltech Borj El Amri 1142", "Borj Ettoumi Tebourba 1143", "El Fejja Mornaguia 1153", "Cite Aboubaker Esseddik Jedaida 1124", "El Mahfoura Tebourba 1143", "Cite Bel Hay Jedaida 1124", "Toungar Tebourba 1143", "Bou Hanech Mornaguia 2028", "Cite Ben Hassine Jedaida 1124", "Ain El Karma Tebourba 1144", "El Bassatine Mornaguia 2028", "Cite De La Rtt Jedaida 1124", "Chouigui Tebourba 1133", "Ain Zammit Tebourba 1144", "Cite Ennacim Oued Ellil 2031", "Cite Des Andalous Jedaida 1124", "Chaouat Jedaida 1134", "Eddikhila Tebourba 1144", "Cite Erriadh Zone C Oued Ellil 2031", "Cite Dhamene Jedaida 1124", "Cite Ecole Primaire Jedaida 1134", "El Ansarine Tebourba 1144", "Cite Erriadh Zone F Oued Ellil 2031", "Cite Dhniba Jedaida 1124", "El Haouaria Tebourba 1144", "Essaida Oued Ellil 2031", "Cite El Baraka Jedaida 1124", "Bazim Houmet Essouk 4180", "Cite Ennour Beni Khedache 4110", "Erriadh Houmet Essouk 4146", "Cite Ben Issa Houmet Essouk 4180", "Cite Erriadh Beni Khedache 4110", "Houmet Larbeh Houmet Essouk 4146", "Cite Bou Okkazine Houmet Essouk 4180", "Cite Ettahrir Beni Khedache 4110", "Methania Ajim 4150", "Cite De La Police Houmet Essouk 4180", "Cite Ezzouhour Beni Khedache 4110", "Battouma Beni Khedache 4151", "Cite Des Enseignants Houmet Essouk 4180", "Cite Ibn Khaldoun Beni Khedache 4110", "Eddikhila Beni Khedache 4151", "Cite Erriadh Houmet Essouk 4180", "Cite Sidi Mansour Beni Khedache 4110", "El Behira Beni Khedache 4151", "Cite Jouamaa Houmet Essouk 4180", "Ksar El Hallouf Beni Khedache 4110", "Foum Ennagueb Beni Khedache 4151", "Cite Ouvriere 1 Houmet Essouk 4180", "Ksar El Kherachfa Beni Khedache 4110", "Ksar Jedid Beni Khedache 4151", "Cite Ouvriere 2 Houmet Essouk 4180", "Ksar Jouamaa Beni Khedache 4110", "Ksar Krikria Beni Khedache 4151", "Ras Jedir Ben Guerdane 4153", "Cite Populaire Houmet Essouk 4180", "Zammour Beni Khedache 4110", "El Ghrabate Zarzis 4154", "Cite Sidi El Bahri Houmet Essouk 4180", "Oum Ettamar Medenine Nord 4111", "Tlet Ajim 4155", "Fatou Houmet Essouk 4180", "Ouerjijene Beni Khedache 4112", "El Guebline Ajim 4155", "Hachene Houmet Essouk 4180", "Ouled Amor Midoun 4113", "Guellala Ajim 4155", "Jerba Houmet Essouk 4180", "Erraja Zarzis 4114", "Houmet El Fahmine Ajim 4155", "El Bayaz Sidi Makhlouf 4181", "Mellita Jerba Houmet Essouk 4115", "Ghizen Houmet Essouk 4156", "El Ghabbay Sidi Makhlouf 4181", "Aghir Midoun 4116", "Chouamekh Beni Khedache 4159", "Erragouba Sidi Makhlouf 4181", "El Hadadda Midoun 4116", "Ben Guerdane Ben Guerdane 4160", "Erragouba El Gharbia Sidi Makhlouf 4181", "Jamaa El Gaied Midoun 4116", "Bou Hamed Ben Guerdane 4160", "Sarandi Houmet Essouk 4182", "Khazroun Midoun 4116", "Chareb Errajel Ben Guerdane 4160", "Ouersnia Ben Guerdane 4183", "Midoun Midoun 4116", "Cite El Baath Ben Guerdane 4160", "Cite De La Douane Houmet Essouk 4185", "Sayagh Midoun 4116", "Cite Ennour Ben Guerdane 4160", "Cite Sidi Zaied Houmet Essouk 4185", "Sidi Yati Midoun 4116", "Cite Essourour Ben Guerdane 4160", "Souani Houmet Essouk 4185", "Zone Hoteliere Midoun 4116", "Cite Populaire Ben Guerdane 4160", "Mezraya Houmet Essouk 4186", "Jorf Sidi Makhlouf 4117", "El Maamrate Ben Guerdane 4160", "Sidi Zaied Houmet Essouk 4190", "Jerba Aeroport Houmet Essouk 4120", "Neffatia Ben Guerdane 4160", "Bedoui Sidi Makhlouf 4191", "Koutine Medenine Nord 4121", "Oued Errabaya Ben Guerdane 4160", "Cite 9 Avril Sidi Makhlouf 4191", "Ksar El Jira Beni Khedache 4122", "Sayah Ben Guerdane 4160", "El Gosba Sidi Makhlouf 4191", "Oualegh Houmet Essouk 4123", "Tabai Ben Guerdane 4160", "El Grine Sidi Makhlouf 4191", "El Hichem Zarzis 4124", "Chehbania Ben Guerdane 4163", "El Morra Sidi Makhlouf 4191", "El Groo Ajim 4125", "Gribis Zarzis 4164", "Sidi Makhlouf Sidi Makhlouf 4191", "Jabira Ajim 4125", "Mahboubine Midoun 4165", "Jalel Ben Guerdane 4192", "Beni Maaguel Midoun 4126", "Oued Zbib Ajim 4166", "Jemila Ben Guerdane 4193", "Medenine Perseverance Medenine Sud 4127", "Beni Fetaiel Zarzis 4170", "Hamadi El Guebli Zarzis 4194", "Medenine El Jedida Medenine Nord 4130", "Bou Jlida Zarzis 4170", "Guechiine Houmet Essouk 4195", "Hassi Amor Medenine Sud 4131", "Bou Teffaha Zarzis 4170", "Dar Jerba Midoun 4199", "Halg Jemal Beni Khedache 4132", "Cite Chokrbane Zarzis 4170", "Robbana Midoun 4133", "Cite Darb El Bab Zarzis 4170", "Chammakh Zarzis 4134", "Cite Ksar Ouled Mhamed Zarzis 4170", "Cite El Kriba Zarzis 4134", "Cite Ksar Ouled Said Zarzis 4170", "Cite Populaire Zarzis 4134", "Cite Sidi El Kebir Zarzis 4170", "Cite El Khrachfa Medenine Nord 4100", "Cite Zrig Zarzis 4134", "El Marathia Zarzis 4170", "Cite Ennour Medenine Nord 4100", "El Khriba Zarzis 4134", "Kaoui El Kadir Zarzis 4170", "Cite Ezzouhour Medenine Nord 4100", "Mezrane Ajim 4135", "Khaoui El Ghedir Zarzis 4170", "Cite Haddada Medenine Nord 4100", "Ajim Ajim 4135", "Ksar Ezzaouia Zarzis 4170", "Cite Jouamaa Medenine Nord 4100", "Bou Smail Ajim 4135", "Ouglet Souihel Zarzis 4170", "Cite Nouvelle Medenine Nord 4100", "Chaouch Ajim 4135", "Ras Edhahra Zarzis 4170", "Cite Sidi Ezzitouni Medenine Nord 4100", "Cite Populaire Ajim 4135", "Sahbi Zarzis 4170", "Amra Nouvelle Medenine Sud 4100", "Ghandri Ajim 4135", "Sanchou Zarzis 4170", "Beni Ghezeyel Medenine Sud 4100", "Houmet Ben Harzallh Ajim 4135", "Zarzis Zarzis 4170", "Cite Cheraiha Medenine Sud 4100", "Houmet Bou Hastine Ajim 4135", "Jedaria Zarzis 4172", "Cite Des Abricots Medenine Sud 4100", "Houmet Issa Ajim 4135", "Cite Beni Fetaiel 1 Zarzis 4173", "Cite El Ahras Medenine Sud 4100", "Khenensa Ajim 4135", "Cite Beni Fetaiel 2 Zarzis 4173", "Cite Ennacim Medenine Sud 4100", "Sedghiane Houmet Essouk 4136", "Cite El Mansoura Zarzis 4173", "Cite Erraja Medenine Sud 4100", "Zarzis Zone Franche Zarzis 4137", "Cite Sangho Zarzis 4173", "Cite Gammoudi Cheref Medenine Sud 4100", "Bou Ghrara Medenine Sud 4141", "Cite Sidi Saad Zarzis 4173", "Cite Touta Medenine Sud 4100", "Medenine El Maarifa Medenine Nord 4142", "Lella Mariem Zarzis 4173", "El Amra Medenine Sud 4100", "El Maghraouia Medenine Sud 4143", "Ouled Abdennebi Zarzis 4173", "Essaadane Medenine Sud 4100", "El Mouensa Zarzis 4144", "Souihel Zarzis 4173", "Medenine Medenine Sud 4100", "Cedouikeche Midoun 4145", "Hassi Jerbi Zarzis 4174", "Oued Esseder Medenine Sud 4100", "El Krachoua Midoun 4145", "El May Midoun 4175", "Souitir Medenine Sud 4100", "Ouersighen Midoun 4145", "Houmet Hazem Midoun 4175", "Tajerjimet Medenine Sud 4100", "Tafartast Midoun 4145", "Arkou Midoun 4176", "Touicha Medenine Sud 4100", "Tomogret Midoun 4145", "Sidi Mehrez Houmet Essouk 4179", "Beni Khedache Beni Khedache 4110", "Cite Snit Houmet Essouk 4146", "Zone Skanes Monastir 5060", "Sahline Sahline 5012", "Cite Ennadhour 2 Ksibet El Mediouni 5031", "Cite Nouvelle Sahline 5061", "Menzel Kamel Jemmal 5013", "Cite Ennadhour 3 Ksibet El Mediouni 5031", "Sidi Ameur Sahline 5061", "Beni Hassen Beni Hassen 5014", "Cite Essakia Ksibet El Mediouni 5031", "Amirat Hatem Beni Hassen 5062", "Cite Ettahrir Beni Hassen 5014", "Cite Ezzayatine Ksibet El Mediouni 5031", "Bou Dher Ksibet El Mediouni 5063", "Bou Hajar Sayada Lamta Bou Hajar 5015", "Cite Oued Sekkal Ksibet El Mediouni 5031", "Cite Populaire Ksibet El Mediouni 5031", "Monastir Aeroport Monastir 5065", "Cite Choobet Romman Sayada Lamta Bou Hajar 5015", "Cite Rabbah Ksibet El Mediouni 5031", "Zone Hoteliere Monastir 5065", "Cite Nouvelle Sayada Lamta Bou Hajar 5015", "Cite Sidi El Mediouni Ksibet El Mediouni 5031", "Soukrine Teboulba 5066", "Ksar Helal Riadh Ksar Helal 5016", "Cite Snit Ksibet El Mediouni 5031", "Cite Bir Ali Hellal Ksar Helal 5070", "El Hedadra Jemmal 5017", "Cite Tarek Ibn Zied Ksibet El Mediouni 5031", "Cite Bir Soukra Ksar Helal 5070", "Cite Commerciale 1 Jemmal 5020", "Ksibet El Mediouni Ksibet El Mediouni 5031", "Cite Bit Mekka Ksar Helal 5070", "Cite Commerciale 2 Jemmal 5020", "Mazdour Bembla 5032", "Cite Chougar Ksar Helal 5070", "Cite El Amen Jemmal 5020", "Menzel Hayet Zeramdine 5033", "Cite Commerciale 1 Ksar Helal 5070", "Cite El Bassatine1 Jemmal 5020", "Cherahil Moknine 5034", "Cite Commerciale 2 Ksar Helal 5070", "Cite El Bassatine2 Jemmal 5020", "Cite El Bassatine Moknine 5034", "Cite Dar Bumbla Ksar Helal 5070", "Cite El Fateh Jemmal 5020", "Cite El Omrane Moknine 5034", "Cite De La Municipalite Ksar Helal 5070", "Cite El Intilaka Jemmal 5020", "Cite Ennasr Moknine 5034", "Cite Ejjebsa Ksar Helal 5070", "Cite El Izdihar Jemmal 5020", "Cite Ezzayatine Moknine 5034", "Cite El Gariaa Ksar Helal 5070", "Cite El Khadhra Jemmal 5020", "Cite Populaire Moknine 5034", "Cite El Maglouba Ksar Helal 5070", "Cite El Manar 1 Jemmal 5020", "Cite Trabelsia Moknine 5034", "Cite Erriadh 1 Ksar Helal 5070", "Cite El Manar 2 Jemmal 5020", "Cite Zraraa Moknine 5034", "Cite Erriadh 2 Ksar Helal 5070", "Cite El Wifak Jemmal 5020", "Cite Gourraia Sayada Lamta Bou Hajar 5035", "Cite Erriadh 3 Ksar Helal 5070", "Cite El Yasmine Jemmal 5020", "Cite Nouvelle Sayada Lamta Bou Hajar 5035", "Cite Industrielle Ksar Helal 5070", "Cite Ennasr Jemmal 5020", "Cite Sidi Ammar Sayada Lamta Bou Hajar 5035", "Cite Moueheddine Ksar Helal 5070", "Cite Ennour Jemmal 5020", "Sayada Sayada Lamta Bou Hajar 5035", "Cite Oued Kacem Et El Ourami Ksar Helal 5070", "Cite Ennouzha Jemmal 5020", "Sidi Abdessalem Sayada Lamta Bou Hajar 5035", "Cite Sanit Zaag Et Charef Ksar Helal 5070", "Cite Erriadh Jemmal 5020", "Menzel Harb Bembla 5036", "Ksar Helal Ksar Helal 5070", "Cite Essalem Jemmal 5020", "Cite El Kods Zeramdine 5040", "Amirat El Hojjej Moknine 5071", "Cite Ettaamir Jemmal 5020", "Cite El Manar Zeramdine 5040", "Menara Bembla 5076", "Cite Ettadhamen Jemmal 5020", "Zeramdine Zeramdine 5040", "Monastir Gare Monastir 5079", "Cite Ezzahra Jemmal 5020", "Menzel Khir Ouerdanine 5041", "Cite Bou Drisse Teboulba 5080", "Cite Ezzouhour 1 Jemmal 5020", "Mesjed Issa Sahline 5042", "Cite El Fadhline Teboulba 5080", "Cite Ezzouhour 2 Jemmal 5020", "Bir Taieb Jemmal 5043", "Teboulba Teboulba 5080", "Cite Independance Jemmal 5020", "Sidi Bannour Moknine 5044", "Cite El Bassatine Monastir 5089", "Cite Jaouhara Jemmal 5020", "Mzaougha Zeramdine 5045", "Baghdadi Bekalta 5090", "Cite Jardins Jemmal 5020", "Mlichette Zeramdine 5046", "Bekalta Bekalta 5090", "Cite Operations Du Sahel Jemmal 5020", "Cite 7 Novembre Moknine 5050", "Cite El Bassatine Bekalta 5090", "Cite Sidi Messaoud Jemmal 5020", "Cite Chahed 1 Moknine 5050", "Cite El Izdihar Bekalta 5090", "Jemmal Jemmal 5020", "Cite Chahed 2 Moknine 5050", "Cite Nouvelle Bekalta 5090", "Bembla Bembla 5021", "Cite Chahed 3 Moknine 5050", "Guealla Bekalta 5090", "Cite El Khadhra Bembla 5021", "Cite Erriadh Moknine 5050", "Ouled Hedda Bekalta 5090", "Cite El Mandra Bembla 5021", "Cite Gribaa Moknine 5050", "Ouled Issa Bekalta 5090", "Cite Ennabka Bembla 5021", "Cite Hmada Bacha Moknine 5050", "Ouled Touibi Bekalta 5090", "Cite Populaire Bembla 5021", "Cite Mesada Moknine 5050", "Zebid Bekalta 5090", "Cite 2 Mars Bembla 5022", "Cite Ras El Oued Moknine 5050", "Charaf Bekalta 5091", "Cite El Jazia Bembla 5022", "Cite Souassi Moknine 5050", "El Behira Bekalta 5092", "Cite Souihria Bembla 5022", "Moknine Moknine 5050", "Cite Bir El Ayeb Sayada Lamta Bou Hajar 5099", "Menzel Ennour Bembla 5022", "Moknine El Jadida Moknine 5051", "Cite Ennadhour Sayada Lamta Bou Hajar 5099", "Touza Ksibet El Mediouni 5023", "Bou Othmane Ouerdanine 5052", "Lamta Sayada Lamta Bou Hajar 5099", "Menzel Fersi Moknine 5024", "Amirat El Fehoul Moknine 5053", "Bennane Ksibet El Mediouni 5025", "Amirat Touazra Moknine 5054", "Cite Air Nouvelle Ksibet El Mediouni 5025", "Cite Bir Hlou Monastir 5060", "Cite El Bassatine Ksibet El Mediouni 5025", "Cite Cheraka Monastir 5060", "Cite El Intilaka Ksibet El Mediouni 5025", "Cite Cnrps Monastir 5060", "Monastir Monastir 5000", "Ghenada Beni Hassen 5026", "Cite El Amel Monastir 5060", "Cite 22 Janvier Ouerdanine 5010", "Ettiayra Jemmal 5027", "Cite El Faouz Monastir 5060", "Cite 7 Novembre Ouerdanine 5010", "Cite El Khadhra Jemmal 5028", "Cite El Farik Monastir 5060", "Cite Abdelaziz Thaalbi Ouerdanine 5010", "Cite Ettahrir Jemmal 5028", "Cite El Mzali Monastir 5060", "Cite Ennouhoudh Ouerdanine 5010", "Zaouiet Kontech Jemmal 5028", "Cite Erriadh Monastir 5060", "Cite Ennouzha Ouerdanine 5010", "Jemmal Kheireddine Jemmal 5030", "Cite Essaada Monastir 5060", "Cite Mohamed Ali Ouerdanine 5010", "Cite 18 Janvier Ksibet El Mediouni 5031", "Cite Essalem Monastir 5060", "Ouerdanine Ouerdanine 5010", "Cite Commerciale Ksibet El Mediouni 5031", "Cite Sidi Nasser Monastir 5060", "Khenis Monastir 5011", "Cite De La Liberte Ksibet El Mediouni 5031", "Cite Trabelsia Monastir 5060", "Cite Echaabia Nlle Sahline 5012", "Cite El Bassatine Ksibet El Mediouni 5031", "Monastir Republique Monastir 5060", "Mootmar Sahline 5012", "Cite Ennadhour 1 Ksibet El Mediouni 5031", "Cite Des Jeunes Beni Khiar 8023", "Takelsa Takelsa 8031", "El Khelaifa El Mida 8044", "Diar Ben Salem Beni Khiar 8060", "Cite Jemmali Menzel Bouzelfa 8010", "Cite Afh Kelibia 8090", "Cite Du Jardin Beni Khiar 8023", "Sidi Jedidi Hammamet 8032", "El Maisra El Mida 8044", "Borj El Grais Bou Argoub 8061", "Cite Laroui Menzel Bouzelfa 8010", "Cite Assemmer Kelibia 8090", "Cite El Manar Beni Khiar 8023", "Diar El Hojjej Korba 8033", "El Mida El Mida 8044", "Sidi Dhaher Bou Argoub 8061", "Cite Municipale Barket Menzel Bouzelfa 8010", "Cite Ksiba Kelibia 8090", "Cite Ezzouhour Beni Khiar 8023", "Lebna Menzel Temime 8034", "Erreghine El Mida 8044", "Cite El Mahrsi 1 Nabeul 8062", "Cite Neguira Menzel Bouzelfa 8010", "Cite Riadh Kelibia 8090", "Cite Mansour Beni Khiar 8023", "Azmour Kelibia 8035", "Errouiguette El Mida 8044", "Cite El Mahrsi 2 Nabeul 8062", "Cite Souihli Menzel Bouzelfa 8010", "Dar Chichou Kelibia 8090", "Cite Populaire 1 Beni Khiar 8023", "Beni Ayech Kelibia 8035", "Menzel Touhami El Mida 8044", "Cite El Mahrsi 3 Nabeul 8062", "Cite Souissi Menzel Bouzelfa 8010", "Dar Dabous Kelibia 8090", "El Halfa Beni Khiar 8023", "Bou Krim El Haouaria 8036", "Oum Dhouil Village El Mida 8044", "Henchir El Haouaria Nabeul 8062", "Damous El Hajja Menzel Bouzelfa 8010", "Kelibia Kelibia 8090", "Somaa Beni Khiar 8023", "Borj Hafaiedh Bou Argoub 8040", "Oum Dhouil Zaouia El Mida 8044", "Nabeul Thameur Nabeul 8062", "Dar Joundi Menzel Bouzelfa 8010", "Kerkouane Kelibia 8090", "Cite Sidi Amor Korba 8024", "Bou Ali Bou Argoub 8040", "Sidi Bou Ali El Mida 8044", "Residence Denene Nabeul 8062", "Dar Nader Menzel Bouzelfa 8010", "Sidi Madhkour Kelibia 8090", "Tazarka Korba 8024", "Bou Argoub Bou Argoub 8040", "Charaf El Haouaria 8045", "Residence Oasis Bleu Nabeul 8062", "Dar Takelsa Menzel Bouzelfa 8010", "Errahma Menzel Bouzelfa 8091", "Cite Jardins Hammam El Ghezaz 8025", "Bou Rbii Bou Argoub 8040", "Cite Des Jeunes El Haouaria 8045", "Bou Charray Soliman 8063", "El Arima Menzel Bouzelfa 8010", "Grombalia Ezzouhour Grombalia 8092", "Hammam El Ghezaz Hammam El Ghezaz 8025", "Bousehem Bou Argoub 8040", "Cite Des Rouines El Haouaria 8045", "Skalba Menzel Temime 8064", "Kalbousi Menzel Bouzelfa 8010", "Ain Tebournok Grombalia 8093", "Beni Khira El Haouaria 8026", "Chagleb Bou Argoub 8040", "Cite El Amel El Haouaria 8045", "Oued El Khatef Kelibia 8065", "Ksirat Menzel Bouzelfa 8010", "Jebel Trif Grombalia 8093", "El Gorfa El Haouaria 8026", "Cite Cnel Bou Argoub 8040", "Cite El Intilaka El Haouaria 8045", "Ghardaya Beni Khiar 8066", "Menzel Bouzelfa Menzel Bouzelfa 8010", "Zemnit Grombalia 8093", "Saheb Jebel El Haouaria 8026", "Cite Commerciale Bou Argoub 8040", "Cite El Izdihar El Haouaria 8045", "Kelibia Charguia Kelibia 8069", "Oued Sidi Said Menzel Bouzelfa 8010", "Melloul Kelibia 8094", "Batrou Grombalia 8030", "Cite De La Carriere Bou Argoub 8040", "Cite El Khadhra El Haouaria 8045", "Beni Aichoun Korba 8070", "Zengou Menzel Bouzelfa 8010", "Ezzahra Hammam El Ghezaz 8096", "Belli Halte Grombalia 8030", "Cite El Henchir Bou Argoub 8040", "Cite Ennour El Haouaria 8045", "Beni Mechkel Korba 8070", "Zenich Menzel Bouzelfa 8010", "Hammam Jebli Hammam El Ghezaz 8096", "Beni Ayech Grombalia 8030", "Cite El Houani Bou Argoub 8040", "Cite Essalama El Haouaria 8045", "Bou Lazhar Korba 8070", "Bayoub Dar Chaabane Elfehri 8011", "Tamazrat Hammam El Ghezaz 8096", "Cite 7 Novembre Grombalia 8030", "Cite El Hourria Bou Argoub 8040", "Cite Ezzouhour El Haouaria 8045", "Bou Lidine Korba 8070", "Cite Barnoussa Dar Chaabane Elfehri 8011", "Cite El Houda Beni Khalled 8099", "Cite Afh Grombalia 8030", "Cite Ezzaouia Bou Argoub 8040", "Cite Sprols El Haouaria 8045", "Cite Bir Ezzitoun Korba 8070", "Cite El Ferdaous Dar Chaabane Elfehri 8011", "Cite Erriadh 1 Beni Khalled 8099", "Cite Antar Grombalia 8030", "Cite Jadida Bou Argoub 8040", "Cite Touristique El Haouaria 8045", "Cite Commerciale Korba 8070", "Cite Ennouzha Dar Chaabane Elfehri 8011", "Cite Erriadh 2 Beni Khalled 8099", "Cite Ben Attaya Grombalia 8030", "Cite Mongi Slim Bou Argoub 8040", "El Haouaria El Haouaria 8045", "Cite El Khiri Korba 8070", "Cite Ettakaddoum Dar Chaabane Elfehri 8011", "Cite Jardins 1 Beni Khalled 8099", "Cite Ben Zaied Grombalia 8030", "Cite Sprols Bou Argoub 8040", "El Kedoua El Haouaria 8045", "Cite El Majredi Korba 8070", "Cite Oued El Ghoula Dar Chaabane Elfehri 8011", "Cite Jardins 2 Beni Khalled 8099", "Cite Cebala Grombalia 8030", "Douali Bou Argoub 8040", "Ferjoun El Haouaria 8045", "Cite Ettaamir Korba 8070", "Dar Chaabane Elfehri Dar Chaabane Elfehri 8011", "Cite Sidi Bou Said Beni Khalled 8099", "Cite De La Police Grombalia 8030", "Doukhania Bou Argoub 8040", "Menzel Salem El Haouaria 8045", "Cite Jamaa Errahma Korba 8070", "El Frinine Dar Chaabane Elfehri 8011", "Zaouiet Jedidi Beni Khalled 8099", "Cite Des Juges Grombalia 8030", "El Grabcha Bou Argoub 8040", "Sidi Hassoun El Haouaria 8045", "Ain Kemicha Nabeul 8000", "Cite Jerad Korba 8070", "Fondouk Jedid Grombalia 8012", "Cite Dhamene Grombalia 8030", "El Kharrouba Bou Argoub 8040", "Bir El Jedey El Haouaria 8046", "Cite Abdessalem El Behi Nabeul 8000", "Cite Jerbi Korba 8070", "Seltene Grombalia 8012", "Cite Eddamous Grombalia 8030", "El Machrouha Bou Argoub 8040", "El Kermania El Haouaria 8046", "Cite Bahroun Nabeul 8000", "Cite Sadok Jerbi Korba 8070", "El Maamoura Beni Khiar 8013", "Cite El Mandra Grombalia 8030", "El Mhedhba Bou Argoub 8040", "Zaouiet El Mgaies El Haouaria 8046", "Cite Cnrps Nabeul 8000", "Cite Sidi Salem Korba 8070", "Bir Drassen Beni Khalled 8014", "Cite El Ouerdia Grombalia 8030", "Chaabet El Mrezga Hammamet 8050", "Cite Cote Or 1 Nabeul 8000", "Jebel Haddad Korba 8070", "Khous Grombalia 8014", "Cite Erriadh Grombalia 8030", "Chatt El Khalij Hammamet 8050", "Cite Cote Or 2 Nabeul 8000", "Korba Korba 8070", "Menzel Horr Menzel Temime 8015", "Cite Essomboula Grombalia 8030", "Cite Ennadhour Hammamet 8050", "Cite Des Oranges Nabeul 8000", "Korchine Korba 8070", "Sidi Daoud El Haouaria 8016", "Cite Ezzouhour Grombalia 8030", "Cite Erriadh Hammamet 8050", "Cite El Bassatine Nabeul 8000", "Ksar Saad Korba 8070", "Cite Gharnata Soliman 8020", "Cite Ibn Khaldoun Grombalia 8030", "Cite Ibn Badis Hammamet 8050", "Cite El Borj 1 Nabeul 8000", "Lathleth Korba 8070", "Cite Hotel Des Andalous Soliman 8020", "Cite Jardins Grombalia 8030", "Cite Kheireddine Pacha Hammamet 8050", "Cite El Borj 2 Nabeul 8000", "Tebak Korba 8070", "Cite Nouvelle Soliman 8020", "Cite Mohamed Ali Grombalia 8030", "Cite Militaire Hammamet 8050", "Cite Ennacim Nabeul 8000", "Tefeloun El Mida 8071", "Cite Sprols Soliman 8020", "Cite Mongi Slim Grombalia 8030", "Cite Moussa Ibn Noussaier Hammamet 8050", "Cite Ennajeh Nabeul 8000", "Meraissa Soliman 8073", "Dhahri Soliman 8020", "Cite Snit Grombalia 8030", "Cite Okba Ibn Naafa Hammamet 8050", "Cite Ettaamir Nabeul 8000", "Bou Hbib El Haouaria 8074", "El Abebsa Soliman 8020", "Cite Taieb Mhiri Grombalia 8030", "Cite Sanit Sheikh Hammamet 8050", "Cite Hali Nabeul 8000", "Tazougrane El Haouaria 8074", "El Marja Soliman 8020", "Cite Tarek Ibn Zied Grombalia 8030", "Echak Hammamet 8050", "Cite Industrielle Nabeul 8000", "Zougag El Haouaria 8074", "Soliman Soliman 8020", "Cite Valenza Grombalia 8030", "Harithine Bou Argoub 8040", "Hammamet Hammamet 8050", "Cite Jasmins Simpar Nabeul 8000", "Dar Chaabane Plage Dar Chaabane Elfehri 8075", "Beni Khalled Beni Khalled 8021", "El Argoub Jedid Grombalia 8030", "Ouled Abdallah Bou Argoub 8040", "Residence Ellissa Hammamet 8050", "Cite Mohsen Limam Nabeul 8000", "Korba Hached Korba 8076", "Cite Achibet Amor Beni Khalled 8021", "El Karmia Grombalia 8030", "Zone Industrielle Bou Argoub 8040", "Residence Ennacim Hammamet 8050", "Cite Sidi Amor Nabeul 8000", "Beni Abdelaziz Menzel Temime 8080", "Cite Air Nouvelle Beni Khalled 8021", "El Khouine Grombalia 8030", "Korbous Soliman 8041", "Sidi Hmed Hammamet 8050", "Cite Sidi Moussa Nabeul 8000", "Chatt Ezzouhour Menzel Temime 8080", "Cite Alaya Yakoubi Beni Khalled 8021", "El Kobba El Kebira Grombalia 8030", "Bir Bouregba Hammamet 8042", "Zone Hoteliere Hammamet 8050", "Cite Universitaire Nabeul 8000", "Cite Ettaamir Menzel Temime 8080", "Cite Ben Romdhane Beni Khalled 8021", "El Mhedhba Grombalia 8030", "Cite Bir Chaaba Hammamet 8042", "Cherifate Soliman 8051", "Henchir Gort Nabeul 8000", "Cite Populaire Menzel Temime 8080", "Cite Chelbia Oumaya Beni Khalled 8021", "Grombalia Grombalia 8030", "Cite Bouslama Hammamet 8042", "Nianou Grombalia 8052", "Mimosas Villas Et Bungalows Nabeul 8000", "Cite Sidi Salem Menzel Temime 8080", "Cite Daghrour Beni Khalled 8021", "Henchir Ettouta Grombalia 8030", "Cite Chraf Hammamet 8042", "Garaat Sassi Korba 8053", "Nabeul Nabeul 8000", "Damous Menzel Temime 8080", "Cite Des Jeunes Beni Khalled 8021", "Khanguet Gare Grombalia 8030", "Cite Ecole Hammamet 8042", "El Ouediane Menzel Temime 8054", "Bedar Menzel Bouzelfa 8010", "Echaibni Menzel Temime 8080", "Cite Du Printemps Beni Khalled 8021", "Nouel Grombalia 8030", "Cite El Bekkey Hammamet 8042", "Dar Allouche Kelibia 8055", "Beni Ghanem Menzel Bouzelfa 8010", "El Gheris Menzel Temime 8080", "Cite El Gaied Beni Khalled 8021", "Sammach Grombalia 8030", "Cite El Fawara Hammamet 8042", "Barraket Essahel Hammamet 8056", "Beni Jannet Menzel Bouzelfa 8010", "El Gobba Menzel Temime 8080", "Cite Essalem Beni Khalled 8021", "Bir Mroua Takelsa 8031", "Cite El Intilaka Hammamet 8042", "Cite Afh Hammamet 8056", "Bouchrik Menzel Bouzelfa 8010", "Garsoline Menzel Temime 8080", "Cite Ettaamir Beni Khalled 8021", "Cite Erriadh Takelsa 8031", "Cite El Mellassine Hammamet 8042", "Cite Chatteles Hammamet 8056", "Charfine Menzel Bouzelfa 8010", "Kef Chami Menzel Temime 8080", "Cite Ezzaouch Beni Khalled 8021", "Cite Populaire Takelsa 8031", "Cite Ennaim Hammamet 8042", "Cite El Izdihar Hammamet 8056", "Cite Ahmed Othman Menzel Bouzelfa 8010", "Lazidine Menzel Temime 8080", "Cite Ezzouhour Beni Khalled 8021", "Douala Takelsa 8031", "Cite Essafsaf Hammamet 8042", "Cite El Kharroub Hammamet 8056", "Cite Azaiez Menzel Bouzelfa 8010", "Menzel Issa Menzel Temime 8080", "Cite Latrech Beni Khalled 8021", "El Bekekcha Takelsa 8031", "Cite Garde Nationale Hammamet 8042", "Cite El Ksour Hammamet 8056", "Cite Bahroun Menzel Bouzelfa 8010", "Menzel Temime Menzel Temime 8080", "Cite Mekki Beni Khalled 8021", "El Brij Takelsa 8031", "Cite Harboun 1 Hammamet 8042", "Cite El Yasmine Hammamet 8056", "Cite Ben Hjel Menzel Bouzelfa 8010", "Sidi Abdelmonem Menzel Temime 8080", "Cite Mokhtar Rhouma Beni Khalled 8021", "El Maisra Takelsa 8031", "Cite Sidi Ali Hammamet 8042", "Cite Estah Hammamet 8056", "Cite Chaafouri Menzel Bouzelfa 8010", "Sidi Jameleddine Menzel Temime 8080", "Cite Sidi Bou Yahia Beni Khalled 8021", "Ghars  Mrad Takelsa 8031", "Cite Snit 1 Hammamet 8042", "Cite Jawaher1 Hammamet 8056", "Cite Cheikh Menzel Bouzelfa 8010", "Khanguet El Hojjaj Grombalia 8082", "Cite Souissi Beni Khalled 8021", "Henchir Chedli Takelsa 8031", "Cite Snit 2 Hammamet 8042", "Cite Jawaher2 Hammamet 8056", "Cite Cherif Menzel Bouzelfa 8010", "Rainine Menzel Temime 8083", "Belli Bou Argoub 8022", "Oued El Abid Takelsa 8031", "Bou Jerida Korba 8043", "Cite Merzgui Hammamet 8056", "Cite Daghbagi Menzel Bouzelfa 8010", "Turki Grombalia 8084", "Cite Bou Jaafar Beni Khiar 8023", "Ramel Takelsa 8031", "Ain El Ghrab El Mida 8044", "Cite Snit Hammamet 8056", "Cite Ennouzha Menzel Bouzelfa 8010", "Fartouna El Mida 8089", "Cite Chafrada 1 Beni Khiar 8023", "Rtiba Takelsa 8031", "Cite Dhahret Ezzaouia El Mida 8044", "Beni Khiar Beni Khiar 8060", "Cite Essahli Menzel Bouzelfa 8010", "Abene Kelibia 8090", "Cite Chafrada 2 Beni Khiar 8023", "Cite De La Liberte Beni Khiar 8023", "Sidi Issa Takelsa 8031", "Cite Essoualmia El Mida 8044", "Cite Erriadh Beni Khiar 8060", "Cite Ettahrir Menzel Bouzelfa 8010", "Charaf Kelibia 8090", "Cite El Menzah Agareb 3030", "Henchir El Joub El Hencha 3043", "Cite El Foll Sfax Est 3064", "El Helalfa El Hencha 3010", "Cite Sidi Abid Sfax Sud 3083", "Cite Ennour Agareb 3030", "Merkez Choucha El Hencha 3043", "Cite El Wafa Sfax Est 3064", "El Hencha El Hencha 3010", "Tyna Sfax Sud 3083", "Cite Snit Agareb 3030", "Sidi Mhamed Ben Amor El Hencha 3043", "Cite Essalem Sfax Est 3064", "Henchir El Mosbah El Hencha 3010", "Cite Tyna 1 Sfax Sud 3084", "El Mahrouga Agareb 3030", "Soualmia El Hencha 3043", "Cite Jaouhara Sfax Est 3064", "Jalaila El Hencha 3010", "Cite Tyna 2 Sfax Sud 3084", "El Maraania Agareb 3030", "El Mourouj Mahras 3044", "Sfax Port Sfax Ville 3065", "Ouled Amor El Hencha 3010", "Tyna El Jadida Sfax Sud 3084", "El Msadga Agareb 3030", "Nekta Mahras 3044", "Ain Charfi Sfax Ville 3000", "Essaadi El Amra 3066", "Ouled Tahar El Hencha 3010", "Oum Choucha Bir Ali Ben Khelifa 3085", "Merkez Attia Agareb 3030", "Ennajet Kerkenah 3045", "Ain El Fellat Sfax Ville 3000", "Merkez El Khemiri El Amra 3066", "Cite De Le Liberte Sakiet Eddaier 3011", "Ajenga Jebeniana 3086", "Merkez Bou Ledhieb Agareb 3030", "El Mhara El Amra 3046", "Ain El Mayel Sfax Ville 3000", "Oued Laachech El Amra 3066", "Cite El Amel Sakiet Eddaier 3011", "Beliana El Amra 3087", "Merkez Jouaouda Agareb 3030", "Essalem El Amra 3046", "Ain Tourkia Sfax Ville 3000", "Merkez Lajmi Sakiet Eddaier 3067", "Cite El Haffara Sakiet Eddaier 3011", "Ennigrou Sfax Ville 3089", "Merkez Tijani Agareb 3030", "Bab El Jebli Sfax Ville 3047", "Ain Turki Sfax Ville 3000", "Sfax Hached Sfax Ville 3069", "Merkez Kaaniche Sakiet Eddaier 3011", "Sidi Salah Sakiet Ezzit 3091", "Traka Agareb 3030", "Souk El Feriani Sfax Ville 3048", "Bir Ben Ayed Sfax Ville 3000", "Chergui Kerkenah 3070", "Sakiet Eddaier Sakiet Eddaier 3011", "Bou Jarbou Menzel Chaker 3092", "Zeliana Agareb 3030", "Sfax Magreb Arabe Sfax Ville 3049", "Bir El Mellouli Sfax Ville 3000", "Cite Ancienne Kellaline Kerkenah 3070", "Merkez Sahnoun Sfax Sud 3012", "Merkez Ouali Sfax Sud 3093", "Merkez Bouacida Sakiet Ezzit 3031", "Bou Said Esskhira 3050", "Bir Tebak Sfax Ville 3000", "Cite Bouaid Kellaline Kerkenah 3070", "Cite 2000 Sfax Sud 3013", "Cite Bourguiba Sakiet Eddaier 3094", "Merkez Derouiche Sfax Ville 3032", "Cherafra Esskhira 3050", "Cite Bourguiba 2 Sfax Ville 3000", "Cite Cnel Kerkenah 3070", "Merkez Chaabouni Sfax Sud 3013", "Dhraa Ben Ziad El Amra 3095", "Bir Salah El Hencha 3033", "El Gherairia Esskhira 3050", "Cite Bouzid Sfax Ville 3000", "Cite Dar Oum Dlel Kerkenah 3070", "Merkez Dammak Sfax Sud 3013", "El Ketatna El Amra 3095", "El Hammam Ghraiba 3034", "El Hicha Esskhira 3050", "Cite Cnrps Sfax Ville 3000", "Cite Douirette Kerkenah 3070", "Merkez Kassas Sfax Sud 3013", "Rebaya Sidi Dhaher Bir Ali Ben Khelifa 3097", "Essoudane Ghraiba 3034", "El Maghdhia Esskhira 3050", "Cite Commerciale Sfax Ville 3000", "Cite El Azezba Kerkenah 3070", "Bou Thadi Menzel Chaker 3014", "El Bousten Sfax Ville 3099", "Ghraiba Ghraiba 3034", "El Melha Esskhira 3050", "Cite Compensation Sfax Ville 3000", "Cite El Mahjar Kerkenah 3070", "Cite Groupe 1 Kerkenah 3015", "El Attaya Kerkenah 3035", "Esskhira Esskhira 3050", "Cite De Le Liberte Sfax Ville 3000", "Cite Houmet Glace Kerkenah 3070", "Cite Groupe 2 Kerkenah 3015", "Cite 7 Novembre El Amra 3036", "Fondouk Chibani Esskhira 3050", "Cite Du Jardin 1 Sfax Ville 3000", "Cite Nouvelle Kellaline Kerkenah 3070", "Mellita Kerkenah 3015", "Cite El Hmerna El Amra 3036", "Frichette Esskhira 3050", "Cite El Amel Sfax Ville 3000", "Cite Ourand Kerkenah 3070", "El Louza Jebeniana 3016", "Cite Ezzayatine El Amra 3036", "Jerouala Esskhira 3050", "Cite El Maaref Sfax Ville 3000", "Cite Populaire Kerkenah 3070", "Bechka Menzel Chaker 3020", "Cite Houma Charguia El Amra 3036", "Kenitra Esskhira 3050", "Cite El Mourouj Sfax Ville 3000", "Cite Rakhani Kerkenah 3070", "Chaaleb Menzel Chaker 3020", "Cite Populaire 1 El Amra 3036", "Naoual Esskhira 3050", "Cite Essourour Sfax Ville 3000", "El Abbassia Kerkenah 3070", "Cite 7 Novembre Menzel Chaker 3020", "Cite Populaire 2 El Amra 3036", "Ouled Haj Moussa Esskhira 3050", "Cite Ezzitouna Sfax Ville 3000", "Jouaber Kerkenah 3070", "Cite De La Gare Menzel Chaker 3020", "Cite Populaire 3 El Amra 3036", "Sidi Mhamed Nouiguez Esskhira 3050", "Cite Joua Sfax Ville 3000", "Kellabine Kerkenah 3070", "Cite El Habib Menzel Chaker 3020", "El Amra El Amra 3036", "Souani Esskhira 3050", "Cite Nouvelle Kerkouan Sfax Ville 3000", "Kerkenah Kerkenah 3070", "Cite Erraoudha Menzel Chaker 3020", "El Fidh El Amra 3036", "Merkez El Alia Sfax Ville 3051", "Cite Siape Sfax Ville 3000", "Mellita Ouled Bou  Ali Kerkenah 3070", "Cite Ettahrir Menzel Chaker 3020", "Cite Habib Bourguiba Menzel Chaker 3020", "Iffi El Amra 3036", "Cite De La Sante Sfax Est 3052", "El Achach Sfax Ville 3000", "Ouled Bou Ali Kerkenah 3070", "Cite Habib Thameur Menzel Chaker 3020", "Gargour Agareb 3037", "Cite Dounia Sfax Est 3052", "Habbana 2 Sfax Ville 3000", "Ouled Yaneg Kerkenah 3070", "Cite Merkez Sellami Menzel Chaker 3020", "Caid Mhamed Sfax Ville 3039", "Cite El Habib Sfax Est 3052", "Majen Eddroj Sfax Ville 3000", "Oued Chaabouni Sfax Est 3071", "Cite Taieb Mhiri Menzel Chaker 3020", "Bir Ali Ben Khelifa Bir Ali Ben Khelifa 3040", "Cite El Menzah Sfax Est 3052", "Merkez Ben Ameur Sfax Ville 3000", "Merkez Chaker Sfax Est 3072", "El Aitha Menzel Chaker 3020", "Bir Ouled Mahmoud Bir Ali Ben Khelifa 3040", "Cite El Messaadine Sfax Est 3052", "Merkez Bermaki Sfax Ville 3000", "Sbih Esskhira 3073", "Hai Kacem Menzel Chaker 3020", "Cheraiet Bir Ali Ben Khelifa 3040", "Cite El Yasmine Sfax Est 3052", "Merkez Bou Khedir Sfax Ville 3000", "El Aouabed Sfax Sud 3074", "Haj Kacem 1 Menzel Chaker 3020", "Cite Des Roses 1 Bir Ali Ben Khelifa 3040", "Cite Essaada Sfax Est 3052", "Merkez Guirat Sfax Ville 3000", "Merkez Sghar Agareb 3075", "Haj Kacem 2 Menzel Chaker 3020", "Cite Des Roses 2 Bir Ali Ben Khelifa 3040", "Sidi Hassen El Hencha 3053", "Merkez Jellouli Sfax Ville 3000", "El Aouyet Sfax Sud 3076", "Ksar Errih Menzel Chaker 3020", "Cite El Fateh Bir Ali Ben Khelifa 3040", "Cite El Afrane Sakiet Eddaier 3054", "Merkez Zouayed Sfax Ville 3000", "Merkez Aloui Sfax Sud 3076", "Limaya Menzel Chaker 3020", "Cite El Menzel Bir Ali Ben Khelifa 3040", "Merkez Sebai Sakiet Eddaier 3054", "Oued Laachech Sfax Ville 3000", "Douar Louata Jebeniana 3077", "Menzel Hedi Chaker Menzel Chaker 3020", "El Aouyed Bir Ali Ben Khelifa 3040", "El Kraten Kerkenah 3055", "Rouadhi Sfax Ville 3000", "El Hajeb Sfax Sud 3078", "Oued Lazrag Menzel Chaker 3020", "El Oudrane Bir Ali Ben Khelifa 3040", "Ouled Bousmir Jebeniana 3056", "Sfax Sfax Ville 3000", "Hai El Khiri Sfax Ville 3079", "Tlil El Ajla Menzel Chaker 3020", "Letaifa Bir Ali Ben Khelifa 3040", "Jeberna Agareb 3057", "Sidi Abdelkefi Sfax Ville 3000", "Ain El Ghezal Jebeniana 3080", "Zaibet Menzel Chaker 3020", "Merkez El Hamrouni Bir Ali Ben Khelifa 3040", "El Khazzanette Sfax Sud 3059", "Sidi Jilani Sfax Ville 3000", "Blitech Jebeniana 3080", "Sakiet Ezzit Sakiet Ezzit 3021", "Oued Rekham Bir Ali Ben Khelifa 3040", "Belhouchette Mahras 3060", "Sidi Liteyem Sfax Ville 3000", "Cite El Bassatine Jebeniana 3080", "Merkez Kamoun Sfax Sud 3022", "Ras Fartout Bir Ali Ben Khelifa 3040", "Chaal Gare Mahras 3060", "Soualmia Sfax Ville 3000", "Cite El Fateh Jebeniana 3080", "Oued Rmal Sfax Est 3023", "Ras Souinia Bir Ali Ben Khelifa 3040", "Chaffar Mahras 3060", "Bir Chaaba El Hencha 3010", "Cite Jardins Jebeniana 3080", "Belhouichette Ghraiba 3024", "Rebaya Bir Ali Ben Khelifa 3040", "Cite Bourguiba Mahras 3060", "Cite Algerie El Hencha 3010", "El Botria Jebeniana 3080", "Chaal Ghraiba 3024", "Sidi Dhaher Bir Ali Ben Khelifa 3040", "Cite El Bouhali Mahras 3060", "Cite Cherif El Hencha 3010", "El Gherasa Jebeniana 3080", "Ettakaddoum Ghraiba 3024", "Sidi Mansour Bir Ali Ben Khelifa 3040", "Cite El Guidira Mahras 3060", "Cite Commerciale 1 El Hencha 3010", "El Guelalja Jebeniana 3080", "Rabta Ghraiba 3024", "Souinia Bir Ali Ben Khelifa 3040", "Cite Ennajah Mahras 3060", "Cite Commerciale 2 El Hencha 3010", "Henchir El Euch Jebeniana 3080", "Skaina Ghraiba 3024", "Toulb Bir Ali Ben Khelifa 3040", "Cite Ennasr Mahras 3060", "Cite El Fateh El Hencha 3010", "Jebeniana Jebeniana 3080", "Smara Ghraiba 3024", "Cite 20 Mars Sakiet Ezzit 3041", "Cite Ennour Mahras 3060", "Cite El Fheil El Hencha 3010", "Ouled Ahmed Jebeniana 3080", "Tarfaoui Ghraiba 3024", "Cite Ennasr Sakiet Ezzit 3041", "Cite Flemech Mahras 3060", "Cite El Hancha Est El Hencha 3010", "Ouled Msallem Edkhal Jebeniana 3080", "Ouled Kacem Kerkenah 3025", "Cite Ennouzha Sakiet Ezzit 3041", "Cite Huillerie Mahras 3060", "Cite El Hancha Ouest El Hencha 3010", "Ouled Youssef Jebeniana 3080", "Aguegcha Jebeniana 3026", "El Mnasria Sakiet Ezzit 3041", "El Hachichinia Mahras 3060", "Cite El Hancha Sud El Hencha 3010", "Sidi Msarra Jebeniana 3080", "Hazeg Jebeniana 3026", "Merkez Chihya Sakiet Ezzit 3041", "El Mouessette Mahras 3060", "Cite El Ifa El Hencha 3010", "Cite El Mallek Sakiet Eddaier 3081", "Ouled Mnasser Jebeniana 3026", "El Ain Sfax Sud 3042", "Mahras Mahras 3060", "Cite El Kouifla El Hencha 3010", "Essaadi Sakiet Eddaier 3081", "Sfax El Jadida Sfax Ville 3027", "Merkez Aloulou Sfax Sud 3042", "Smara Mahras 3060", "Cite El Ojna El Hencha 3010", "Essaltania Sakiet Eddaier 3081", "Agareb Agareb 3030", "Merkez Jilani Sfax Sud 3042", "Cite Ennadhour Sakiet Eddaier 3061", "Cite Environnement El Hencha 3010", "El Guendoul Bir Ali Ben Khelifa 3082", "Ben Sahloun Agareb 3030", "Bir Lahmar El Hencha 3043", "Cite Erriadh Sakiet Eddaier 3061", "Cite Ouled Aicha El Hencha 3010", "Cite Badrani Sfax Sud 3083", "Cite 2 Mars Agareb 3030", "Cite Populaire El Hencha 3043", "Cite Nouvelle Sakiet Eddaier 3061", "Cite Oum Salah El Hencha 3010", "Cite El Mghaier Sfax Sud 3083", "Cite 2 Mars 1 Agareb 3030", "Doukhane El Hencha 3043", "Sidi Mansour Sakiet Eddaier 3061", "El Ghieb El Hencha 3010", "Cite Ennasr Sfax Sud 3083", "Cite 2 Mars 2 Agareb 3030", "El Ghraba El Hencha 3043", "Sidi Abbes Sfax Sud 3062", "El Guetatsa El Hencha 3010", "Cite Moez 1 Sfax Sud 3083", "Cite Cnel Agareb 3030", "El Khecherma El Hencha 3043", "El Khalij Sakiet Eddaier 3063", "El Hachana El Hencha 3010", "Cite Moez 2 Sfax Sud 3083", "Cite El Izdihar Agareb 3030", "Esseghara El Hencha 3043", "Cite El Bahri Sfax Est 3064", "El Hajjara El Hencha 3010", "Cite Moez 4 Sfax Sud 3083", "Menzel Bouzaiene Menzel Bouzaiene 9114", "Bir Badra Sidi Bouzid Ouest 9131", "El Fej Ben Oun 9169", "Dhraa Sidi Bouzid Est 9100", "Hania  102 Ouled Haffouz 9180", "Menzel Saada Menzel Bouzaiene 9114", "Eddagher Sidi Bouzid Ouest 9131", "El Gouedria Ben Oun 9169", "Ezzitoune Sidi Bouzid Est 9100", "Horbit Ouled Haffouz 9180", "Ouled Zouid Menzel Bouzaiene 9114", "El Fateh Sidi Bouzid Ouest 9131", "Erragba Ben Oun 9169", "Garet Hadid Sidi Bouzid Est 9100", "Khebina Ouled Haffouz 9180", "Rbeayia Menzel Bouzaiene 9114", "El Hichria Sidi Bouzid Ouest 9131", "Ouled El Achi Ben Oun 9169", "Bir Bouzid Sidi Bouzid Ouest 9100", "Ouled Haffouz Ouled Haffouz 9180", "Bir El Akerma Regueb 9115", "Henchir Esnab Sidi Bouzid Ouest 9131", "Ouled Mnasser Ben Oun 9169", "Cite El Brahmia Sidi Bouzid Ouest 9100", "Sidi Ellafi 1 Ouled Haffouz 9180", "Bou Chiha Regueb 9115", "Ouled Jalal Sidi Bouzid Ouest 9131", "Bir Charef Regueb 9170", "Cite El Fraijia Sidi Bouzid Ouest 9100", "Sidi Ellafi 2 Ouled Haffouz 9180", "El Ghaba Essouda Regueb 9115", "Oum Ettouboul Sidi Bouzid Ouest 9131", "Bir Gzaiel Regueb 9170", "El Hawajbia Sidi Bouzid Ouest 9100", "Sidi Khlif Ouled Haffouz 9180", "Essfaya Regueb 9115", "Cite El Kaouafel Sidi Bouzid Ouest 9132", "Bir Khelifa Regueb 9170", "Essadaguia Sidi Bouzid Ouest 9100", "El Abbadette Ouled Haffouz 9183", "Ouled El Hani Regueb 9115", "El Haouamed Sidi Bouzid Est 9133", "Bir Nsib Regueb 9170", "Essandoug Sidi Bouzid Ouest 9100", "Saida Regueb 9115", "Remaidia Sidi Bouzid Est 9133", "Bou Allegue Regueb 9170", "Melikette Sidi Bouzid Ouest 9100", "Dhouibette Ouled Haffouz 9116", "El Guellel Menzel Bouzaiene 9139", "Bou Dinar Regueb 9170", "Ouithet Gazal Sidi Bouzid Ouest 9100", "Baten El Agaag Ben Oun 9120", "Cite Des Abricots Maknassy 9140", "Cite De La Republique Regueb 9170", "Sidi Bouzid Sidi Bouzid Ouest 9100", "Ben Bechir Ben Oun 9120", "Cite Des Martyrs Maknassy 9140", "Cite El Bassatine Regueb 9170", "Sidi Salem Sidi Bouzid Ouest 9100", "Ben Oun Ben Oun 9120", "Cite El Fateh 1 Maknassy 9140", "Cite El Intilaka Regueb 9170", "Touila Sidi Bouzid Ouest 9100", "Ben Oun Nord Ben Oun 9120", "Cite El Fateh 2 Maknassy 9140", "Cite El Khadhra Regueb 9170", "Zaafria Sidi Bouzid Ouest 9100", "Bir Idriss Ben Oun 9120", "Cite El Fateh 3 Maknassy 9140", "Cite El Manar Regueb 9170", "Ain Jaffel Jilma 9110", "Cite El Ilm Ben Oun 9120", "Cite El Intilaka Maknassy 9140", "Cite Ennasr Regueb 9170", "Cite Chargui Jilma 9110", "Cite Ennasr Ben Oun 9120", "Cite Ennajah 1 Maknassy 9140", "Cite Ennouzha Regueb 9170", "Cite Ennasr Jilma 9110", "Cite Ennour Ben Oun 9120", "Cite Ennajah 2 Maknassy 9140", "Cite Erriadh Regueb 9170", "Cite Ouled Zaied Jilma 9110", "Cite Erriadh Ben Oun 9120", "Cite Ezzayatine Maknassy 9140", "Cite Ezzouhour Regueb 9170", "Cite Populaire Jilma 9110", "Cite Ettahrir Ben Oun 9120", "Cite Militaire Maknassy 9140", "Cite Ibn Khaldoun Regueb 9170", "El Fenideg Jilma 9110", "Cite Ezzouhour Ben Oun 9120", "Cite Mohamed Ali Maknassy 9140", "El Gouadria Regueb 9170", "El Haouia Jilma 9110", "Damdoum Ben Oun 9120", "Cite Taieb Mhiri Maknassy 9140", "El Houda Regueb 9170", "Guellel Jilma 9110", "El Graoua Ben Oun 9120", "Cite Unite Ennajah Maknassy 9140", "El Mhafdhia Regueb 9170", "Jilma Jilma 9110", "El Khalij Ben Oun 9120", "Dakhlet El Alenda Maknassy 9140", "Essakba Regueb 9170", "Labayedh Jilma 9110", "El Ouaara Ben Oun 9120", "El Ayoun Maknassy 9140", "Ezzadam Regueb 9170", "Sed El Yahoudi Jilma 9110", "El Ouneysia Ben Oun 9120", "El Houayez Maknassy 9140", "Ezzitouna Regueb 9170", "Selta Jilma 9110", "Markez Ben Bechir Ben Oun 9120", "Ezzouaraa Maknassy 9140", "Farch Guerib Regueb 9170", "Sidi Ali Ebn Jaballah Jilma 9110", "Ouled Brahim Ben Oun 9120", "Jabbes Maknassy 9140", "Guenifida Regueb 9170", "Zoghmar Jilma 9110", "Ouled Neji Ben Oun 9120", "Ksar Khelifa Zenati Maknassy 9140", "Henchir Khdam Regueb 9170", "Bir El Bey Sidi Bouzid Ouest 9111", "Bou Attouch Souk Jedid 9121", "Maknassy Maknassy 9140", "Ksar El Hammam Regueb 9170", "El Adhla Sidi Bouzid Ouest 9111", "Cegdel Souk Jedid 9121", "Marche Municipal Maknassy 9140", "Ksar Sai Regueb 9170", "El Ghemamria Sidi Bouzid Ouest 9111", "El Guetayfia Sidi Bouzid Ouest 9111", "Douadnia Souk Jedid 9121", "Touahria 2 Maknassy 9140", "Matlag Regueb 9170", "El Mlikette Sidi Bouzid Ouest 9111", "El Azara Souk Jedid 9121", "El Makarem Sidi Bouzid Est 9141", "Ouled Abdallah Regueb 9170", "Oued El Brij Sidi Bouzid Ouest 9111", "El Hessinette Souk Jedid 9121", "Ouled Farhan Sidi Bouzid Est 9141", "Ouled Ayouni Regueb 9170", "Oum El Adham Sidi Bouzid Ouest 9111", "El Kessayra Souk Jedid 9121", "Bou Chmel Souk Jedid 9142", "Ouled Chabou Regueb 9170", "Ain Bouzer Sidi Bouzid Est 9112", "El Mesatria Souk Jedid 9121", "El Bekakria Souk Jedid 9142", "Regueb Regueb 9170", "Ain Rabbaou Sidi Bouzid Est 9112", "El Msabhia Souk Jedid 9121", "El Hachana Souk Jedid 9142", "Rihana Nord Regueb 9170", "Bazid Sidi Bouzid Est 9112", "Ennouhoudh Souk Jedid 9121", "Gouleb Souk Jedid 9142", "Rihana Sud Regueb 9170", "El Ogla Sidi Bouzid Est 9112", "Essadlia Souk Jedid 9121", "Ouled  Dhaher Souk Jedid 9142", "Sabra Regueb 9170", "Fayedh Sidi Bouzid Est 9112", "Ouled Alaya Souk Jedid 9121", "Remila Souk Jedid 9142", "Sarayria Regueb 9170", "Gatrana Sidi Bouzid Est 9112", "Ouled Ammar Souk Jedid 9121", "Zefzef Souk Jedid 9142", "Sidi Ameur Regueb 9170", "Hania Bazid Sidi Bouzid Est 9112", "Ouled Amor Souk Jedid 9121", "Borj El Karma Maknassy 9143", "El Hmaima Sidi Bouzid Est 9171", "Jemel Sidi Bouzid Est 9112", "Ouled Khedher Souk Jedid 9121", "Mabrouka Maknassy 9144", "Graa Bennour Sidi Bouzid Est 9171", "Ouled Boudhiaf Sidi Bouzid Est 9112", "Ouled Mhamed Souk Jedid 9121", "Ennasr Maknassy 9149", "Lessouda Sidi Bouzid Est 9171", "Ouled Youssef Sidi Bouzid Est 9112", "Souk Jedid Souk Jedid 9121", "Cite De La Poste Mezzouna 9150", "Goubrar Regueb 9172", "Bir Amema Bir El Haffey 9113", "Cebbala Cebbala 9122", "Cite Des Martyrs Mezzouna 9150", "El Khechem Regueb 9173", "Bir Bousbi Bir El Haffey 9113", "Charaa Cebbala 9122", "Cite El Amel Mezzouna 9150", "Fatnassa Regueb 9173", "Bir El Haffey Bir El Haffey 9113", "Cite El Fateh 1 Cebbala 9122", "Cite Independance Mezzouna 9150", "Erradhaa Regueb 9174", "Chakhar Bir El Haffey 9113", "Cite El Fateh 2 Cebbala 9122", "El Gheris Mezzouna 9150", "Boutique Issa Ouled Haffouz 9180", "Eddachra Bir El Haffey 9113", "Cite Ennajah Cebbala 9122", "El Guezgazia Mezzouna 9150", "Chouachnia Ouled Haffouz 9180", "El Hanancha Bir El Haffey 9113", "Cite Ennouzha Cebbala 9122", "El Khima Mezzouna 9150", "Cite Ali Ben Hamid Ouled Haffouz 9180", "El Mhamdia Bir El Haffey 9113", "El Ghemamria Cebbala 9122", "El Khobna Mezzouna 9150", "Cite Commerciale Ouled Haffouz 9180", "Ouled Khelifa Bir El Haffey 9113", "Henchir Haffouz Bir El Haffey 9123", "El Khoui Mezzouna 9150", "Cite El Maarifa Ouled Haffouz 9180", "Ourgha Bir El Haffey 9113", "Houch Ben Necib Bir El Haffey 9123", "Ferjen Mezzouna 9150", "Cite El Omrane Ouled Haffouz 9180", "Bir El Araria Menzel Bouzaiene 9114", "Ksar El Mzara Bir El Haffey 9123", "Ghedir Rebaia Mezzouna 9150", "Cite Erriadh Ouled Haffouz 9180", "Dakhlet Haddej Menzel Bouzaiene 9114", "Ouled Bouaziz Bir El Haffey 9123", "Haddej Mezzouna 9150", "Cite Ezzayatine Ouled Haffouz 9180", "El Aatizez Menzel Bouzaiene 9114", "Rahal Bir El Haffey 9123", "Mezzouna Mezzouna 9150", "Dhouibette 2 Ouled Haffouz 9180", "El Garaa Menzel Bouzaiene 9114", "Khorchef Menzel Bouzaiene 9124", "Oued Eddam Mezzouna 9150", "El Araoua Ouled Haffouz 9180", "El Maadher Menzel Bouzaiene 9114", "Cite Ouled Bel Hedi Sidi Bouzid Ouest 9125", "Ouled Dlala Mezzouna 9150", "El Gouaibia Ouled Haffouz 9180", "El Maloussi Menzel Bouzaiene 9114", "El Adhla Bir El Haffey 9126", "El Founi Mezzouna 9151", "El Kharwaa Ouled Haffouz 9180", "El Mhamdia Menzel Bouzaiene 9114", "Ennouaiel Bir El Haffey 9126", "El Bouaa Mezzouna 9154", "El Mbarkia Ouled Haffouz 9180", "El Omrane Menzel Bouzaiene 9114", "Ettouansia Sidi Bouzid Ouest 9127", "El Meche Maknassy 9158", "Cite Agricole Sidi Bouzid Est 9100", "Ennajah Ouled Haffouz 9180", "Essaada Menzel Bouzaiene 9114", "Mefreg El Frayou Sidi Bouzid Ouest 9127", "Essalama Bir El Haffey 9159", "Dhayaa Sidi Bouzid Est 9100", "Erranzez Ouled Haffouz 9180", "Cite Essiada Makthar 6140", "Cite El Bassatine Bou Arada 6180", "Cite Cheminots Sidi Bou Rouis 6113", "Cite Ksiba Makthar 6140", "Cite El Mellassine Bou Arada 6180", "Cite Du Battoire Sidi Bou Rouis 6113", "Cite Mongi Slim 1 Makthar 6140", "Cite Ennakhil Bou Arada 6180", "Cite Du Lycee Sidi Bou Rouis 6113", "Cite Mongi Slim 2 Makthar 6140", "Cite Ennour 1 Bou Arada 6180", "Cite Ejjamaa Sidi Bou Rouis 6113", "Cite Nouvelle Makthar 6140", "Cite Ennour 2 Bou Arada 6180", "Nechem Sidi Bou Rouis 6113", "El Garaa Makthar 6140", "Cite Erriadh 1 Bou Arada 6180", "Cite 20 Mars Kesra 6114", "Houch Sfaya Makthar 6140", "Cite Erriadh 2 Bou Arada 6180", "Cite El Bassatine Kesra 6114", "Khizrane Makthar 6140", "Cite Erriadh 3 Bou Arada 6180", "Cite El Intilaka Kesra 6114", "Makthar Makthar 6140", "Cite Essaada Bou Arada 6180", "El Garia Sud Kesra 6114", "Ras El Oued Makthar 6140", "Cite Essafa Bou Arada 6180", "Ezzaouia Kesra 6114", "Hammam Kesra Kesra 6114", "Souk Jomaa Makthar 6140", "Cite Essalem Bou Arada 6180", "Kesra Kesra 6114", "Zouakra Makthar 6140", "Cite Ezzayatine Est Bou Arada 6180", "Bou Saadia Bargou 6115", "Bou Abdallah Kesra 6141", "Cite Ezzayatine Ouest Bou Arada 6180", "El Aroussa El Aroussa 6116", "Cite Beni Sayour Kesra 6141", "El Fetisse Bou Arada 6180", "El Hajjej El Aroussa 6116", "Cite El Bhira Kesra 6141", "El Mejenine Bou Arada 6180", "Mosrata El Aroussa 6116", "Cite El Ghrob Kesra 6141", "Henchir Roumene Bou Arada 6180", "Oued El Araar El Aroussa 6116", "Cite El Ksar Kesra 6141", "Jelidi Gare Bou Arada 6180", "Cite Abdrabbah 1 Le Krib 6120", "Kesra Superieur Kesra 6141", "Khamsa Thenaya Bou Arada 6180", "Cite Cnrps Siliana Nord 6100", "Cite Abdrabbah 2 Le Krib 6120", "Sned Haddad Makthar 6142", "Ksar Boukhris Bou Arada 6180", "Cite El Bassatine Siliana Nord 6100", "Cite Commerciale Le Krib 6120", "Essafina Siliana Sud 6143", "Sidi Abdennour Bou Arada 6180", "Cite El Yasmine Siliana Nord 6100", "Cite De La Cellule Le Krib 6120", "Cite El Ouns 1 Rohia 6150", "Douar Ezzriba Siliana Sud 6196", "Cite Ennour 1 Siliana Nord 6100", "Cite Du Battoire Le Krib 6120", "Cite El Ouns 2 Rohia 6150", "El Ghemalia Siliana Sud 6196", "Cite Ennour 2 Siliana Nord 6100", "Cite Ejjamaa Le Krib 6120", "Cite Ennour Rohia 6150", "Ghars  Ezzriba Siliana Sud 6196", "Cite Ennouzha Siliana Nord 6100", "Cite Ennasr Le Krib 6120", "Cite Erriadh Rohia 6150", "Ras El Ma Siliana Sud 6196", "Cite Ezzouhour Siliana Nord 6100", "Cite Essanaouber Le Krib 6120", "Cite Essaada Rohia 6150", "Sidi Ameur Siliana Sud 6196", "Cite Miskia Siliana Nord 6100", "Cite Ettahrir Le Krib 6120", "Cite Ettahrir Rohia 6150", "Sidi Morched Siliana Sud 6196", "Cite Office Cereale Siliana Nord 6100", "Cite Independance Le Krib 6120", "Cite Hedi Khfacha Rohia 6150", "Cite Taieb Mhiri Siliana Nord 6100", "Fej El Hadoum Le Krib 6120", "El Haria Rohia 6150", "Jama Siliana Nord 6100", "Le Krib Le Krib 6120", "El Hmaima Rohia 6150", "Sidi Jabeur Siliana Nord 6100", "Merkez Ben Njah Le Krib 6120", "El Msahla Rohia 6150", "Ain Dissa Siliana Sud 6100", "Oued Tessa El Morr Le Krib 6120", "Fidh Hammed Rohia 6150", "Cite De La Republique Siliana Sud 6100", "Ouled Bouzid Le Krib 6120", "Foundouk Debbich Rohia 6150", "Cite Du Lycee Siliana Sud 6100", "Bennouria Gaafour 6121", "Jemilette Rohia 6150", "Cite El Aida Siliana Sud 6100", "El Abarguia Gaafour 6121", "Rohia Rohia 6150", "Cite Erriadh 1 Siliana Sud 6100", "El Aksab Gaafour 6121", "El Khalsa Makthar 6151", "Cite Erriadh 2 Siliana Sud 6100", "El Amel Gaafour 6121", "39100 Rohia 6152", "Cite Hached Siliana Sud 6100", "Ennajah Gaafour 6121", "Hebabsa Sud Rohia 6152", "Cite Mongi Slim Siliana Sud 6100", "Doukhania Le Krib 6122", "Magrouna Rohia 6152", "El Gabel Siliana Sud 6100", "Ain El Jouza Siliana Sud 6123", "Ain El Fourna Bargou 6170", "El Megarba Siliana Sud 6100", "El Kantra Siliana Sud 6123", "Ain Zakkar Bargou 6170", "Fidh Arous Siliana Sud 6100", "Zaouiet Sidi Abdelmalek Siliana Sud 6123", "Bargou Bargou 6170", "Gabr El Ghoul Siliana Sud 6100", "El Ganara Siliana Sud 6124", "Cite Aboul Kacem Chebbi Bargou 6170", "Ksar Hadid Siliana Sud 6100", "Sidi Hamada Siliana Sud 6124", "Cite Air Nouvelle Bargou 6170", "Sidi Mansour Siliana Sud 6100", "Borj Messaoudi Le Krib 6125", "Cite El Kadim Bargou 6170", "Siliana Siliana Sud 6100", "El Frachich Gaafour 6126", "Cite Essaada Bargou 6170", "Cite Du Battoire Gaafour 6110", "Sidi Ayed Gaafour 6126", "Cite Ezzouhour Bargou 6170", "Cite Du Lycee Gaafour 6110", "Cite Essalah Siliana Nord 6130", "Cite Ibn Khaldoun Bargou 6170", "Cite El Guebli Gaafour 6110", "Cite Essalah 2 Siliana Nord 6130", "Drija Bargou 6170", "Cite El Wafa Gaafour 6110", "Beni Abdallah Kesra 6131", "Marj Aouam Bargou 6170", "Cite Ezzouhour 1 Gaafour 6110", "El Mansoura Kesra 6131", "Sidi Amara Bargou 6170", "Cite Ezzouhour 2 Gaafour 6110", "El Mansoura Nord Kesra 6131", "Sidi Said Bargou 6170", "Cite Ezzouhour 3 Gaafour 6110", "Hammam Biadha Le Krib 6132", "Sidi Zid Bargou 6170", "Cite Touensa Gaafour 6110", "Souk El Jomaa Le Krib 6132", "Ain Zrig Gaafour 6172", "El Kharrouba Gaafour 6110", "El Garia Kesra 6133", "El Barrama Gaafour 6172", "Gaafour Gaafour 6110", "Bou Rouis Filahi Sidi Bou Rouis 6134", "El Haouam Gaafour 6172", "Gaafour Chergui Gaafour 6110", "Ouled Selit Sidi Bou Rouis 6134", "Mediouna Gaafour 6172", "Gaafour Gharbi Gaafour 6110", "Bou Jlida El Aroussa 6135", "El Bhirine Bargou 6173", "Nouisser Gaafour 6110", "Beni Hazam Makthar 6140", "Sodga Bargou 6173", "Akhouat Mine Gaafour 6111", "Chouarnia Makthar 6140", "Ain El Ghessil Bou Arada 6180", "El Akhouat Gaafour 6111", "Cite Debbiche Makthar 6140", "Baten Zraieb Bou Arada 6180", "Mellita Gaafour 6111", "Cite El Bassatine Makthar 6140", "Bou Arada Bou Arada 6180", "Krib Gare Sidi Bou Rouis 6112", "Cite El Ouns 1 Makthar 6140", "Cite Ali Ben Mbarek 1 Bou Arada 6180", "Ain Achour Sidi Bou Rouis 6113", "Cite El Ouns 2 Makthar 6140", "Cite Ali Ben Mbarek 2 Bou Arada 6180", "Bou Rouis Sidi Bou Rouis 6113", "Cite Ennahala Makthar 6140", "Cite Ali Ben Mbarek 3 Bou Arada 6180", "Cite 7 Novembre Sidi Bou Rouis 6113", "Cherachir Sidi El Heni 4026", "Sahloul Sousse Jaouhara 4054", "Bou Ficha Bou Ficha 4010", "Kroussia Sidi El Heni 4026", "Sousse Corniche Sousse Ville 4059", "Cite 20 Mars Bou Ficha 4010", "Cite 7 Novembre Enfidha 4030", "Ahel  Jemiaa Kalaa El Kebira 4060", "Cite Erriadh Bou Ficha 4010", "Cite Cimenterie Enfidha 4030", "Belaoum Kalaa El Kebira 4060", "Cite Ettahrir Bou Ficha 4010", "Cite De L'Action Enfidha 4030", "Cite Bir Chemsi Kalaa El Kebira 4060", "Cite Ezzouhour Bou Ficha 4010", "Cite El Bidhane Enfidha 4030", "Cite Bir Hlaoua Kalaa El Kebira 4060", "Cite Hached Bou Ficha 4010", "Cite El Yasmine Enfidha 4030", "Cite Chargui Kalaa El Kebira 4060", "Cite Militaire Bou Ficha 4010", "Cite Environnement Enfidha 4030", "Cite Commerciale Kalaa El Kebira 4060", "Cite Snit Bou Ficha 4010", "Cite Erriadh Enfidha 4030", "Cite El Bassatine Kalaa El Kebira 4060", "Essalloum Bou Ficha 4010", "Cite Essalem Enfidha 4030", "Cite El Intilaka Kalaa El Kebira 4060", "Lenderia Bou Ficha 4010", "Cite Ettahrir Enfidha 4030", "Cite El Jebs Kalaa El Kebira 4060", "Oued El Kharroub Bou Ficha 4010", "Cite Ezzayatine Enfidha 4030", "Cite El Mansoura Kalaa El Kebira 4060", "Sidi Mtir Bou Ficha 4010", "Cite Hached Enfidha 4030", "Cite Ennouzha 1 Kalaa El Kebira 4060", "Sidi Said Bou Ficha 4010", "Hammam Sousse Hammam Sousse 4011", "Cite Mohamed Ali Enfidha 4030", "Cite Ennouzha 2 Kalaa El Kebira 4060", "El Aribat Hergla 4012", "Dhehaibia Enfidha 4030", "Cite Fadden Aoun Kalaa El Kebira 4060", "Hergla Hergla 4012", "El Frada Enfidha 4030", "Cite Nouvelle Kalaa El Kebira 4060", "Souayeh Hergla 4012", "El Ghoualif Enfidha 4030", "Cite Sidi Zaied Kalaa El Kebira 4060", "Messadine Msaken 4013", "El Ghouilet Enfidha 4030", "Cite Zone Des Metiers Kalaa El Kebira 4060", "Chihia Msaken 4014", "Enfidha Enfidha 4030", "El Kraria Kalaa El Kebira 4060", "El Knaies Msaken 4014", "Essafha Enfidha 4030", "Kalaa El Kebira Kalaa El Kebira 4060", "Beni Rabia Msaken 4015", "Essmaidia Enfidha 4030", "Ouled Lesseoud Kalaa El Kebira 4060", "Cite Cimetiere Msaken 4015", "Grimit Est Enfidha 4030", "Cite Aeroport Sousse Jaouhara 4061", "Cite Dar Esseghair Msaken 4015", "Grimit Ouest Enfidha 4030", "Cite Batiments Sousse Jaouhara 4061", "Cite Ecole Primaire Msaken 4015", "Hicher Enfidha 4030", "Cite Ben Aleya Sousse Jaouhara 4061", "Cite El Mansour Msaken 4015", "Menzel Fateh Enfidha 4030", "Cite El Ghoudrane Sousse Jaouhara 4061", "Cite Hedi Gachacha Msaken 4015", "Methalithe Enfidha 4030", "Cite Sidi Abdelhamid Sousse Jaouhara 4061", "Cite Rached El Ouertani Msaken 4015", "Mrabet Hached Enfidha 4030", "Sousse Ibn Khaldoun Sousse Jaouhara 4061", "Cite Slama Msaken 4015", "Ouled Abdallah Enfidha 4030", "Kalaa El Kebira Ksar Kalaa El Kebira 4062", "El Borjine Msaken 4015", "Ouled Bellil Enfidha 4030", "Chiab Kalaa El Kebira 4063", "El Frada Msaken 4015", "Ouled Mohamed Enfidha 4030", "Msaken Msaken 4070", "Beni Kalthoum Msaken 4016", "Sidi Saidane Enfidha 4030", "Khezama Ouest Sousse Jaouhara 4071", "Cite De La Plage 1 Hammam Sousse 4017", "Takrouna Enfidha 4030", "Zaouiet Sousse Sousse Riadh 4081", "Cite De La Plage 2 Hammam Sousse 4017", "Sousse Ezzouhour Sousse Riadh 4031", "Sidi Khelifa Bou Ficha 4082", "Cite Ennarjes 1 Hammam Sousse 4017", "Menzel Bel Ouaer Enfidha 4032", "Cite Ezzitouna 1 Hammam Sousse 4089", "Cite Ennarjes 2 Hammam Sousse 4017", "Moureddine Msaken 4033", "Cite Ezzitouna 2 Hammam Sousse 4089", "Cite Jaouhara Hammam Sousse 4017", "Chegarnia Enfidha 4034", "Cite Presidentielle Hammam Sousse 4089", "Hammam Sousse Gharbi Hammam Sousse 4017", "Ain Garci Enfidha 4035", "El Kantaoui Hammam Sousse 4089", "Bir Jedid Kondar 4020", "Cite El Bassatine Sidi Bou Ali 4040", "Ain Errahma Bou Ficha 4092", "Blelma Kondar 4020", "Cite Ibn Khaldoun Sidi Bou Ali 4040", "Ain Medheker Enfidha 4095", "El Bechachma Kondar 4020", "El Aitha Sidi Bou Ali 4040", "Msaken El Gueblia Msaken 4099", "Kondar Kondar 4020", "El Alouj Sidi Bou Ali 4040", "Ouled Ameur Kondar 4020", "El Araydhia Sidi Bou Ali 4040", "Ouled El Abed Kondar 4020", "El Mhedhba Sidi Bou Ali 4040", "Tarhouna Kondar 4020", "Essad Sud Sidi Bou Ali 4040", "Cite Chabbett Ezzaouia Kalaa Essghira 4021", "Kenana Sidi Bou Ali 4040", "Cite Chragui Kalaa Essghira 4021", "Ouriemma Sidi Bou Ali 4040", "Cite El Manezeh Kalaa Essghira 4021", "Sidi Bou Ali Sidi Bou Ali 4040", "Cite Khazzen El Ma Kalaa Essghira 4021", "Cite 7 Novembre Sousse Riadh 4041", "Ennagr Kalaa Essghira 4021", "Cite 7 Novembre 3 Sousse Riadh 4041", "Kalaa Essghira Kalaa Essghira 4021", "Cite Sinan Pacha Sousse Riadh 4041", "Oued Laya Kalaa Essghira 4021", "Ksibet Sousse Sousse Riadh 4041", "Akouda Akouda 4022", "Thrayette Sousse Riadh 4041", "Sousse Riadh Sousse Riadh 4023", "Chatt Meriem Akouda 4042", "Cite Boukhzar Sousse Ville 4000", "Msaken Hai Jedid Msaken 4024", "Cite Du Dispensaire Akouda 4042", "Cite Cheminots Sousse Ville 4000", "El Mouissette Sidi El Heni 4025", "Cite Ecole Superieure Akouda 4042", "Cite Cnrps Sousse Ville 4000", "Ghabghoub Sidi El Heni 4025", "Cite Ejjamaa Akouda 4042", "Cite Garde Nationale Sousse Ville 4000", "Ouled Ali B Hani Sidi El Heni 4025", "Halg El Menjel Akouda 4042", "Cite Hached Sousse Ville 4000", "Ouled Alouene Sidi El Heni 4025", "Tantana Akouda 4042", "Cite Hadrumette Sousse Ville 4000", "Ouled Amor Sidi El Heni 4025", "Menzel Gare Sidi Bou Ali 4043", "Cite Jaouhara Sousse Ville 4000", "Ouled Boubaker Sidi El Heni 4025", "Essad Nord Sidi Bou Ali 4045", "Cite Khedher Sousse Ville 4000", "Ouled El Kbaier Sidi El Heni 4025", "Cite De La Steg Sousse Jaouhara 4051", "Cite Militaire Sousse Ville 4000", "Ouled El Khechine Sidi El Heni 4025", "Cite Sidi Daher Sousse Jaouhara 4051", "Cite Rizzi Sousse Ville 4000", "Sidi El Heni Sidi El Heni 4025", "Sousse Khezama Sousse Jaouhara 4051", "Cite Sprols Sousse Ville 4000", "Zerdoub Sidi El Heni 4025", "Cite Sahloul Sousse Jaouhara 4054", "Sousse Sousse Ville 4000", "Cite Du President Tataouine Sud 3200", "El Morra Smar 3223", "Cite El Hedadda Tataouine Sud 3200", "Gualeb Errakham Smar 3223", "Cite Erriadh Tataouine Sud 3200", "Guearaat Helal Smar 3223", "Cite Nouvelle Tataouine Sud 3200", "Ksar El Gaa Smar 3223", "Cite Senegal Tataouine Sud 3200", "Oudiete Abdelounis Smar 3223", "Ghorghar Tataouine Sud 3200", "Ras El Oued Smar 3223", "Sedra Tataouine Sud 3200", "Rehach Smar 3223", "Tataouine Tataouine Sud 3200", "Sabeg Smar 3223", "Tounket Tataouine Sud 3211", "Smar Smar 3223", "Bir Lahmar Bir Lahmar 3212", "El Horria Ghomrassen 3224", "Cite El Bassatine Bir Lahmar 3212", "Kirchaou Smar 3225", "Cite El Grar Bir Lahmar 3212", "Douiret Tataouine Sud 3232", "Cite El Menzah Bir Lahmar 3212", "Gattoufa Tataouine Nord 3233", "Cite Esned Bir Lahmar 3212", "Oued El Khil Ghomrassen 3235", "El Argoub Bir Lahmar 3212", "Borj Bourguiba Remada 3240", "Gragar Bir Lahmar 3212", "Borj El Khadra Remada 3240", "Habhab Bir Lahmar 3212", "El Maghni Remada 3240", "Ksar Ouled Boubaker Bir Lahmar 3212", "El Morra Remada 3240", "Oued El Arfej Bir Lahmar 3212", "El Ouchouch Remada 3240", "Ouled Yahya Bir Lahmar 3212", "Oum Souigh Remada 3240", "Ksar Oun Smar 3213", "Remada Remada 3240", "Tlelet Tataouine Nord 3214", "El Farech Ghomrassen 3241", "Beni Barka Tataouine Sud 3215", "Ksar Debab Tataouine Sud 3242", "El Hachana Tataouine Nord 3217", "Oued El Ghar Tataouine Nord 3243", "Essaada Tataouine Nord 3217", "Zmilet Saber Tataouine Nord 3243", "Cite Bakhtit Ghomrassen 3220", "Bir Amir Remada 3244", "Cite Bir Karma Ghomrassen 3220", "Kambout Remada 3245", "Cite Commerciale Ghomrassen 3220", "Ksar El Mourabtine Ghomrassen 3251", "Cite Des Martyrs Ghomrassen 3220", "Maztouria Tataouine Sud 3252", "Cite Des Oasis Ghomrassen 3220", "Cite 7 Novembre Dhehiba 3253", "Cite Du Stade Ghomrassen 3220", "Cite Du Bain Maure Dhehiba 3253", "Cite El Ain Ghomrassen 3220", "Cite El Aidi Dhehiba 3253", "Cite El Anouar Ghomrassen 3220", "Cite El Amel Dhehiba 3253", "Cite El Bicher Ghomrassen 3220", "Cite Ettadhamen Dhehiba 3253", "Cite El Maaraka Ghomrassen 3220", "Cite Ettadhamen 1 Dhehiba 3253", "Cite Ennakhil Ghomrassen 3220", "Cite Haftali Dhehiba 3253", "Cite Ennasr Ghomrassen 3220", "Cite Ksar Guedim Dhehiba 3253", "Cite Ettahrir 1 Ghomrassen 3220", "Cite Olympique Dhehiba 3253", "Cite Ettahrir 2 Ghomrassen 3220", "Dhehiba Dhehiba 3253", "Cite Founesse Ghomrassen 3220", "Oum Zoggar Dhehiba 3253", "Cite Ibn Arafa Ghomrassen 3220", "Ouni Dhehiba 3253", "Cite Mouzdelifa Ghomrassen 3220", "Ksar El Hedada Ghomrassen 3261", "Cite Nouvelle Ghomrassen 3220", "Beni Mehira Smar 3262", "Cite Romana Ghomrassen 3220", "Tataouine 7 Novembre Tataouine Nord 3263", "Cite Rosfa Ghomrassen 3220", "Ras El Oued Tataouine Sud 3264", "Cite Sifri Ghomrassen 3220", "Guermessa Ghomrassen 3271", "Cite Taousse Ghomrassen 3220", "Ezzahra Tataouine Tataouine Nord 3272", "Cite Tataouine Ghomrassen 3220", "Chenini Nouvelle Tataouine Sud 3274", "El Hencha Ghomrassen 3220", "Ksar Ouled Soltan Tataouine Nord 3282", "Ghomrassen Ghomrassen 3220", "Bir Thlathine Tataouine Sud 3284", "Mdhilla Ghomrassen 3220", "Nekrif Remada 3286", "El Maouna Smar 3200", "Ksar Mguebla Tataouine Sud 3221", "Rogba Tataouine Sud 3293", "Cite Abbes Tataouine Nord 3200", "Chenini Tataouine Sud 3222", "Cite El Mahrajene Tataouine Nord 3200", "Cite Caserne Smar 3223", "Cite Ennour Tataouine Nord 3200", "Cite Du Stade Smar 3223", "Cite Ennouzha Tataouine Nord 3200", "Khetma Tataouine Nord 3200", "Ksar Bhir Tataouine Nord 3200", "Ksar El Galaa Tataouine Nord 3200", "Remtha Tataouine Nord 3200", "Tamazout Tataouine Nord 3200", "Tamelest Tataouine Nord 3200", "Cite Commerciale Tataouine Sud 3200", "El Ghariani Smar 3223", "Cite Des Roses Tataouine Sud 3200", "El Guetaya Smar 3223", "Sabaa Obbat Degueche 2261", "Cite Commerciale Tozeur 2200", "Zaouiet El Arab Degueche 2261", "Tozeur Tozeur 2200", "Dghoumes Degueche 2262", "Cite Afh Tozeur 2210", "Bou Helal Degueche 2263", "Cite Cnrps Tozeur 2210", "Ceddada Degueche 2263", "Cite De La Gare Tozeur 2210", "Cite El Guitna Tozeur 2210", "Cite El Mahrajene Tozeur 2210", "Cite Helba Tozeur 2210", "Cite Hopital Tozeur 2210", "Cite Maison Populaire Tozeur 2210", "Cite Route De Degueche Tozeur 2210", "Cite Route El Hajij Tozeur 2210", "Cite Route El Hamma Tozeur 2210", "Cite Route Ennafliette Tozeur 2210", "Cite Sidi El Hafnaoui Tozeur 2210", "Cite Tebebsa Tozeur 2210", "Tozeur Chokratsi Tozeur 2210", "Zone Touristique Tozeur 2210", "Dhafria Tameghza 2211", "Ain El Karma Tameghza 2212", "Cite Administrative Tameghza 2212", "Cite El Amel Tameghza 2212", "El Frid Tameghza 2212", "Logement Populaire Tameghza 2212", "Mides Tameghza 2212", "Remitha Tameghza 2212", "Sondes Tameghza 2212", "Tameghza Tameghza 2212", "Tozeur Aeroport Tozeur 2213", "Chakmou Degueche 2214", "El Hamma Du Jerid Degueche 2214", "Hezoua Hezoua 2223", "El Mahassen Degueche 2224", "Abbes Tozeur 2233", "Bled El Hadhar Tozeur 2233", "Bou Lifa Tozeur 2233", "Essoualmia Tozeur 2233", "Jahim Tozeur 2233", "Chetaoua Sahraoui Tozeur 2239", "Cite Erriadh Nefta 2240", "Cite Khzama Nefta 2240", "Cite Nouvelle Nefta 2240", "Nefta Nefta 2240", "Cite El Izdihar Tozeur 2241", "Ras Dhraa Tozeur 2241", "Chabbia Tozeur 2243", "Chorfa Tozeur 2243", "Ben Farjallah Nefta 2245", "Chebika Du Jerid Tameghza 2253", "Cite Bou Chagra Tameghza 2253", "Cite De L'Ecole Tameghza 2253", "Cite El Bassatine Tameghza 2253", "Cite El Frada Tameghza 2253", "Cite De La Gare Degueche 2260", "Cite Du Stade Degueche 2260", "Cite El Bassatine Degueche 2260", "Cite El Hasnaoui Degueche 2260", "Cite Logement Presidentiel Degueche 2260", "Cite Nouveau Stade Degueche 2260", "Cite Ouled El Gharbi Degueche 2260", "Cite Ouled Hmida Degueche 2260", "Degueche Degueche 2260", "Ouled Majed Degueche 2261", "El Garjouma Jebel Jelloud 1046", "Cartage Byrsa Carthage 2016", "Cite Essalama La Marsa 2076", "El Sebkha Jebel Jelloud 1046", "Cartage Plage Carthage 2016", "Cite Essirene La Marsa 2076", "Bab Bhar Bab Bhar 1000", "Jebel Jelloud Jebel Jelloud 1046", "Cite De La Steg Carthage 2016", "Marsa Erriadh La Marsa 2076", "Bab El Jazira Bab Bhar 1000", "Berge Du Lac La Marsa 1053", "Cite Mohamed Ali Carthage 2016", "Casino La Goulette La Goulette 2060", "Cite Afh La Marsa 2078", "Sidi Bahri Bab Bhar 1000", "Amilcar Carthage 1054", "Cite Des Enseignants Le Bardo 2017", "Cite Ennacim La Brise La Goulette 2060", "Cite Ben Chaabane La Marsa 2078", "El Medina La Medina 1000", "Gammart La Marsa 1057", "Cite Star Le Bardo 2017", "El Battah La Goulette 2060", "Cite Des Medecins El Menzah 2092", "Cite Des Vergers La Marsa 2078", "El Sabaghine La Medina 1000", "El Hafsia La Medina 1059", "Khaznadar Le Bardo 2017", "Kheireddine La Goulette 2060", "Cite Du Paradis El Menzah 2092", "Cite Du Stade La Marsa 2078", "Sidi Boumendil La Medina 1000", "Cite El Intilaka El Omrane Superieur 1064", "La Goulette La Goulette 2060", "Cite Faiza El Menzah 2092", "Cite El Ahmadi La Marsa 2078", "Republique Bab Bhar 1001", "El Nassim El Omrane Superieur 1064", "La Goulette Nouvelle La Goulette 2060", "Cite Saba El Menzah 2092", "Cite El Hana La Marsa 2078", "Hedi Chaker Bab Bhar 1002", "La Goulette Port La Goulette 1067", "El Manar 2 El Menzah 2092", "Cite El Moez La Marsa 2078", "Taieb El M'Hiri Bab Bhar 1002", "Rommana El Omrane Superieur 1068", "Cite El Moustakbel (Sidi Daoud) La Marsa 2078", "Cite Jardins Cite El Khadra 1002", "Cite Bougatfa 1 El Hrairia 2051", "Habib Thameur Bab Bhar 1069", "Cite El Moustakbel (La Marsa) La Marsa 2078", "Kheireddine Pacha Cite El Khadra 1002", "Cite Errachidia El Hrairia 2051", "Montplaisir Bab Bhar 1073", "Cite Malhatli La Marsa 2078", "Tunis Belvedere El Menzah 1002", "Cite Essalama El Hrairia 2051", "El Mourouj 2 El Kabbaria 1074", "Cite Rimila 1 La Marsa 2078", "Cite El Khadra Cite El Khadra 1003", "Cite Essoltani El Hrairia 2051", "Bab El Khadra Bab Souika 1075", "Cite Rimila 2 La Marsa 2078", "Cite El Wafa Cite El Khadra 1003", "Cite Jlas El Hrairia 2051", "Cite Caravelles El Menzah 1082", "Marsa Safsaf La Marsa 2078", "Cite Olympeade Cite El Khadra 1003", "Cite Medjerda El Hrairia 2051", "Cite El Mahrajene El Menzah 1082", "Cite Ibn Khaldoun I El Omrane Superieur 2062", "Cite Oplympique Cite El Khadra 1003", "Ezzahrouni El Hrairia 2051", "Cite Snit El Menzah 1082", "Cite Ibn Khaldoun Vi El Omrane Superieur 2062", "Cite Star Cite El Khadra 1003", "Cite Bouzaiene El Hrairia 2052", "El Menzah 2 El Menzah 1082", "El Menzah 1 El Menzah 1004", "Ezzouhour 5 El Hrairia 2052", "El Menzah 3 El Menzah 1082", "Bir Atig El Omrane 1005", "Cite Des Officiers Ezzouhour  (Tunis) 2052", "El Menzah 4 El Menzah 1082", "Cite Centrale El Omrane 1005", "Cite Essaada Ezzouhour  (Tunis) 2052", "Mutuelle Ville El Menzah 1082", "Cite Des Oliviers El Omrane 1005", "Cite Essomrane Ezzouhour  (Tunis) 2052", "Abou El Kacem Chebbi Sidi El Bechir 1089", "Cite El Habib El Omrane 1005", "Cite Ezzouhour Ezzouhour  (Tunis) 2052", "Bab Alioua Sidi El Bechir 1089", "Cite Militaire El Omrane 1005", "Ezzouhour 4 Ezzouhour  (Tunis) 2052", "El Gourjani Sidi El Bechir 1089", "Djbal El Ahmar El Omrane 1005", "Cite Bou Hjar El Kabbaria 2053", "Essaida Mannoubia Sidi El Bechir 1089", "El Omrane El Omrane 1005", "El Kabbaria 1 El Kabbaria 2053", "El Yasmina Carthage 2085", "Monfleury Sidi El Bechir 1089", "Oued El Sebai El Omrane 1005", "El Kabbaria 2 El Kabbaria 2053", "Saida Manoubia Sidi El Bechir 1089", "Bab El Akoues Bab Souika 1006", "El Kabbaria 3 El Kabbaria 2053", "Sidi El Bechir Sidi El Bechir 1089", "Bab El Alouj Bab Souika 1006", "El Kabbaria 4 El Kabbaria 2053", "Cite El Mechtel El Hrairia 2087", "Sidi Mansour Sidi El Bechir 1089", "Bab El Assel Bab Souika 1006", "El Ouerdia 4 El Kabbaria 2053", "Cite Hwas El Hrairia 2087", "El Omrane Superieur El Omrane Superieur 1091", "Bab Sidi Abdessalem Bab Souika 1006", "El Hrairia El Hrairia 2087", "Birine Sidi Hassine 1095", "Bab Souika Bab Souika 1006", "Borj Chakir Sidi Hassine 1095", "Borj Zouara Bab Souika 1006", "Bir El Hlou El Kram 2089", "Cite 25 Juillet Sidi Hassine 1095", "El Halfaouine Bab Souika 1006", "Le Kram Ouest El Kram 2089", "Cite 7 Novembre Sidi Hassine 1095", "Hammam El Remimi Bab Souika 1006", "Sidi Amor El Kram 2089", "Cite El Bettoumi Sidi Hassine 1095", "Ibn Sina El Kabbaria 2066", "Sidi Djebeli Bab Souika 1006", "Cite El Mechtel La Goulette 2089", "Cite El Gaafouri Sidi Hassine 1095", "Tronja Bab Souika 1006", "Cite El Mestiri Sidi Hassine 1095", "Cite Helal Essijoumi 2072", "Zaouiet El Bakria Bab Souika 1006", "Cite Mohamed Ali Sidi Hassine 1095", "El Taoufik La Medina 1006", "Cite Mrad 1 Sidi Hassine 1095", "Souk Nel Nhes La Medina 1006", "Cite Mrad 2 Sidi Hassine 1095", "El Mellassine Essijoumi 1007", "Jayara Sidi Hassine 1095", "Bab Djedid La Medina 1008", "Sidi Hassine Sidi Hassine 1095", "Bab Menara La Medina 1008", "Cite Du Jardin Ettahrir 2042", "El Zraria La Medina 1008", "El Charguia Cite El Khadra 2035", "Cite El Ferdaous Ettahrir 2042", "Sidi Ali Azouz La Medina 1008", "Ras Tabia El Omrane 2000", "Cite Essadik Ettahrir 2042", "Tourbet El Bey La Medina 1008", "Bouchoucha Le Bardo 2000", "Cite Ettahrir Sup. Ettahrir 2042", "Maakel EzzaÂ¤M Sidi El Bechir 1008", "Cite Alten Le Bardo 2000", "Ettahrir 1 Ettahrir 2042", "Bellevue El Ouerdia 1009", "Cite Du Stade Le Bardo 2000", "Ettahrir 2 Ettahrir 2042", "Borj Ali Errais El Ouerdia 1009", "Le Bardo Le Bardo 2000", "Ettahrir 3 Ettahrir 2042", "Cite El Izdihar El Ouerdia 1009", "Bortal Hayder Le Bardo 2009", "Cite Thameur Jebel Jelloud 2023", "Cite Mohamed Ali El Ouerdia 1009", "Ksar Said Le Bardo 2009", "El Afrane Jebel Jelloud 2023", "Dibouzville El Ouerdia 1009", "Sidi Fathallah Jebel Jelloud 2023", "Cite El Mhiri La Marsa 2045", "El Ouerdia El Ouerdia 1009", "Cite Sprols La Marsa 2045", "Lakagnia El Ouerdia 1009", "Cite Aziza La Marsa 2046", "Les Martyrs El Ouerdia 1009", "Salambo Carthage 2025", "Cite Borj El Kouki La Marsa 2076", "Cite Bhar Lazreg La Marsa 2046", "Mathul De Ville El Ouerdia 1009", "Sidi Bousaid Carthage 2026", "Cite De La Telediffusion 1 La Marsa 2076", "Cite Mongi Slim La Marsa 2046", "Monhomme El Ouerdia 1009", "Cite De La Telediffusion 2 La Marsa 2076", "Sidi Daoud La Marsa 2046", "El Menzah 9 El Menzah 1013", "Cite Des Juges 2 La Marsa 2076", "Bab Bnet La Medina 1019", "Cite Des Mimosas La Marsa 2076", "Bab El Falla Sidi El Bechir 1027", "Erriadh El Kram 2015", "Cite El Fateh La Marsa 2076", "Bab Saadoun Bab Souika 1029", "Le Kram El Kram 2015", "Cite El Khalil La Marsa 2076", "Bab Saadoun Gare El Omrane 1029", "Le Kram Est El Kram 2015", "Cite El Ouns La Marsa 2076", "Ali Bach-Hamba Jebel Jelloud 1046", "Carthage Carthage 2016", "Cite Erriadh La Marsa 2076", "El Mhedhba Zaghouan 1100", "Bir Halima Zaghouan 1155", "Hemiane Zaghouan 1100", "Sidi Mediene Zaghouan 1155", "Jimla Zaghouan 1100", "Ben Halaoua Ennadhour 1160", "Bir Moukra El Fahs 1140", "Kantra El Kahla Zaghouan 1100", "Chaalil Nord Ennadhour 1160", "Borj Abdeljalil El Fahs 1140", "Merkez Ali Besseghaier Zaghouan 1100", "Chaalil Sud Ennadhour 1160", "Bou Garnine El Fahs 1140", "Mhiris Zaghouan 1100", "Dhorbania Ennadhour 1160", "Chenanfa El Fahs 1140", "Oued Sbaihia Zaghouan 1100", "Ennadhour Ennadhour 1160", "Cite 20 Mars El Fahs 1140", "Sidi Mraieh Zaghouan 1100", "Sidi Bannour Ennadhour 1160", "Cite Bou Hmida El Fahs 1140", "Zaghouan Zaghouan 1100", "Sidi Naji Ennadhour 1160", "Cite Des Enseignants El Fahs 1140", "Souar Ennadhour 1160", "Cite El Amel El Fahs 1140", "Zbidine Ennadhour 1160", "Cite Ennasr El Fahs 1140", "Zouagha Ennadhour 1160", "Cite Ennisma El Fahs 1140", "Bent Saidane El Fahs 1162", "Cite Erriadh El Fahs 1140", "Bir Chaouch Ennadhour 1163", "Cite Essaada 1 El Fahs 1140", "Chebaana Ennadhour 1163", "Cite Essaada 2 El Fahs 1140", "Kef Agueb Ennadhour 1163", "Cite Essalem El Fahs 1140", "Jebel El Oust Bir Mcherga 1111", "Meidher Ennadhour 1163", "Cite Industrille El Fahs 1140", "Jeradou Hammam Zriba 1112", "Mrigueb Ennadhour 1163", "Cite Snit Nouvelle El Fahs 1140", "El Amaiem El Fahs 1140", "Bir Mcherga Gare Bir Mcherga 1193", "El Fahs El Fahs 1140", "Dhraa Ben Jouder El Fahs 1194", "El Knaziz El Fahs 1140", "Gherifat El Fahs 1140", "Glib Jemal El Fahs 1140", "Henchir Brouta El Fahs 1140", "Henchir Dhomda El Fahs 1140", "Jabbes El Fahs 1140", "Jebel Mansour El Fahs 1140", "Jougar El Fahs 1140", "Kef Ezzroug El Fahs 1140", "Khemayssia El Fahs 1140", "Koudouat Chair El Fahs 1140", "Oued El Khadhra El Fahs 1140", "Oum El Abouab El Fahs 1140", "Rehahla El Fahs 1140", "Sed Oued El Kebir El Fahs 1140", "Charchara Saouef 1115", "Sidi Amara El Fahs 1140", "Dghafla Saouef 1115", "Sidi Naoui El Fahs 1140", "Douar El Haj Amor Saouef 1115", "Tebika El Fahs 1140", "El Hmira Sud Saouef 1115", "Tlil Essalhi El Fahs 1140", "El Khadhra Saouef 1115", "Bir Mcherga Bir Mcherga 1141", "Halg Ennab Saouef 1115", "Boucha Bir Mcherga 1141", "Henchir El Hamira Saouef 1115", "Delaiel El Arouss Bir Mcherga 1141", "Oued Touil Saouef 1115", "Ouled Helel Bir Mcherga 1141", "Ain Essaboune Zaghouan 1100", "Saouef Saouef 1115", "Ain Lansarine Zaghouan 1100", "Sidi Dghim Saouef 1115", "Ain Ledhieb Zaghouan 1100", "Sidi Farjallah Saouef 1115", "Ain Safsaf Zaghouan 1100", "Sidi Mansour Saouef 1115", "Bni Darraj Zaghouan 1100", "Zagtoun Saouef 1115", "Bni Mar Zaghouan 1100", "Zeguidane Saouef 1115", "Cite 20 Mars Zaghouan 1100", "Cite Administrative Zaghouan 1100", "El Magren Zaghouan 1121", "Cite Bourguiba Zaghouan 1100", "Ain Batria Hammam Zriba 1122", "Cite De La Municipalite Zaghouan 1100", "Sidi Aouidette El Fahs 1146", "Bou Achir Hammam Zriba 1122", "Cite De La Sonede Zaghouan 1100", "Cite Du Lycee Hammam Zriba 1152", "Oued El Kenz Hammam Zriba 1122", "Cite Des Nymphes Zaghouan 1100", "Cite El Houda Hammam Zriba 1152", "Zriba Hammam Zriba 1122", "Cite Du Lycee Zaghouan 1100", "Hammam Zriba Hammam Zriba 1152", "Ain El Asker Bir Mcherga 1123", "Sminja Bir Mcherga 1131", "Cite El Bassatine Zaghouan 1100", "Bou Slim Zaghouan 1132", "Cite El Menzah Zaghouan 1100", "Ain El Battoum Ennadhour 1154", "Hammam Jedidi Zaghouan 1132", "Cite Ennouzha Zaghouan 1100", "Bou Araara Ennadhour 1154", "Oued Ezzit Zaghouan 1132", "Cite Equipement Zaghouan 1100", "El Hnainia Ennadhour 1154", "Cite Ezzouhour Zaghouan 1100", "Erragba Ennadhour 1154", "Cite Industrielle 1 Zaghouan 1100", "Ouled Jaballah Ennadhour 1154", "Cite Industrielle 2 Zaghouan 1100", "Soughas Nord Ennadhour 1154", "Cite Nesrine Zaghouan 1100", "Soughas Sud Ennadhour 1154"];

    constructor(private modalService: NgbModal,public adressService: AdresseService, private tservice: TripService,
         public loginService: LoginService, public http: Http, public sanitizer: DomSanitizer, public router: Router,
         private spinner: NgxSpinnerService, private snackBar: MatSnackBar,) {
            this.auth = localStorage.getItem('auth');
            if (this.auth === 'admin'){
                this.isVisible = true;
            } else {
                this.isVisible = false;
            }
            this.random = Math.random;                       
         }

    ngOnInit() {
        this.chooseView = 50;
        //this.getTrips();
        //this.getFiltredTrips(null, null, null);                
        this.getFiltredTrips1(this.startDateFilter, this.endDateFilter, this.searchTerm, this.clientFilter,
            this.stateFilter, this.enRetardFilter, this.payementStatusFilter, null);
        // this.getTripsOnInit();
        /* this.tservice.getTrips().subscribe( data => {
            this.items = data;
        }); */

        this.getAllDrivers();
        
        this.id = this.id.replace('UT', '');
        this.Adresses = this.adressService.getAdresses();
        console.log(this.Adresses);                    
    }
    
    /* MyCtrl($timeout, $q) {
        var fetchOne = function() {
            var deferred = $q.defer();
            $timeout(function() {
                deferred.resolve([this.random, this.random + 100, this.random + 200]);
            }, this.random * 5000);
            return deferred.promise;
        };
        
        this.scans = [];
        for (var i = 0; i < 5; i++) {
            fetchOne().then(function(items) {
                angular.forEach(items, function(item) {
                    this.scans.push(item);
                });
            });
        };
    } */

    open(content) {
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });        
    }

    openSm(content) {
        this.modalService.open(content, { size: 'sm' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });        
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    openAddModal(content) {  
        console.log('checkedTrips ', this.checkedTrips);        
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        this.searchPlaces();
        this.getGovAndDelegOfTunisia();
        let key = this.zipCode;
        const gouvernorat = $( '#gouvernorat' );
        const delegation = $( '#delegation' );
        const compoAdr = $( '#cityGlobalDest' );
        const zip = $( '#zipCode' );
        const delegation2 = $( '#delegation2' );
        const tunData = this.tunisiaData;
        //TunisiaGovAndDelg.autocompleteFromJson(delegation2, tunData);
        TunisiaGovAndDelg.findGovAndDelegByZipCode(key, gouvernorat, delegation, compoAdr, zip, tunData);
        /* $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) {    
            var json = (data);
            var dd;
            $.each( json , function (index, value)
            {                 
                var deleg = json[ index ];
                $.each( deleg, function (index, value)
                {                                                                      
                    var adr = value['localite'] + ' ' + value['delegation'] + ' ' + value['cp'];
                    dd = dd + ', "' + adr + '"';                                                              
                });
                    
            });
            console.log(dd);
        }); */
    }
    
    
    openDechargeModal(content) {
        this.displayQrCode = true;
        console.log('numDisplayedElement', this.numDisplayedElement) ;
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        if(this.checkedTrips != null) {
            this.fraixTotal = 0;
            this.valeurTotal = 0;
            this.totalTripInManifest = this.checkedTrips.length;
            let dj = new Date();
            this.dateJ = this.changeDateFormatDMY(dj);
            for(let i =0; i < this.checkedTrips.length; i++){
                this.fraixTotal = this.fraixTotal + this.checkedTrips[i].costTrip;
                this.valeurTotal = this.valeurTotal + this.checkedTrips[i].packageTrip.valPackage;
            }
        }

    }
    openBordereauxModal(content) {        
        this.openDechargeModal(content);
        this.displayQrCode = false;
    }

    openBlModal(content, trip) {
        this.AskOfBonLiv(trip);
        this.tripBl = trip;
        this.open(content);
    }

    getTrips() {
        this.auth = localStorage.getItem('auth');
        console.log("login",this.auth);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.dataUser = this.currentUser.data[0];
        console.log(this.currentUser);
        if(this.auth === 'admin'){
            this.id = 'admin';
        }else{
            this.id = 'UT' + this.currentUser.data[0].idUser;
        }
        console.log(this.id);
        this.jsonObj = null;
        this.items = [];
        console.log('this.chooseView', this.chooseView);
        if (this.chooseView != 'none') {
            this.sizeListTrip = this.chooseView;
        } else {
            this.sizeListTrip = 20;
        }
        this.tservice.getTrips(this.id, this.sizeListTrip).subscribe(data => {
            this.result = data['_body'];

            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            for (let index = 0; index < this.jsonObj.length; index++) {
                this.items.push(this.jsonObj[index]);
            }
            this.itemsSearch = this.items;
            this.spinner.hide();
        });

        this.setCheckedTrip();
    }

    getFiltredTrips1(dateTp, dateTp2, keyTp, keyTp1, keyTp2, keyTp3, keyTp4, btnTp) {
        this.spinner.show();
        this.auth = localStorage.getItem('auth');
        console.log("login",this.auth);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.dataUser = this.currentUser.data[0];
        console.log(this.currentUser);
        if(this.auth === 'admin'){
            this.id = 'admin';
        }else{
            this.id = 'UT' + this.currentUser.data[0].idUser;
        }
        console.log(this.id);
        this.jsonObj = null;
        this.items = [];
        console.log('this.chooseView', this.chooseView);
        

        if (dateTp != null) {
            this.dateFiltredTrip = this.changeDateFormatMDY(dateTp);
            console.log('dateFiltredTrip', this.dateFiltredTrip);
        } else {
            this.dateFiltredTrip = '';
        }
        if (dateTp2 != null) {
            this.dateFiltredTrip2 = this.changeDateFormatMDY(dateTp2);
            console.log('dateFiltredTrip2', this.dateFiltredTrip2);
        } else {
            this.dateFiltredTrip2 = '';
        }
        
        if (keyTp != null) {
            this.keyFiltredTrip = keyTp;
        } else {
            this.keyFiltredTrip = '';
        }
        if (keyTp1 != null) {
            this.keyFiltredTrip1 = keyTp1;
        } else {
            this.keyFiltredTrip1 = '';
        }
        if (keyTp2 != null) {
            console.log('keyTp2', keyTp2);
            if (keyTp2 === 'tous') {
                console.log('keyTp22 ok', keyTp2);
                this.keyFiltredTrip2 = '';
            } else {
                console.log('keyTp233 ok', keyTp2);
                this.keyFiltredTrip2 = keyTp2;
            }
        } else {
            this.keyFiltredTrip2 = '';
        }
        if (keyTp3 != null) {
            this.keyFiltredTrip3 = keyTp3;
        } else {
            this.keyFiltredTrip3 = '';
        }
        if (keyTp4 != null) {
            if (keyTp4 === 'tous') {
                this.keyFiltredTrip4 = '';
            } else {
                this.keyFiltredTrip4 = keyTp4;
            }
        } else {
            this.keyFiltredTrip4 = '';
        }

        if (btnTp != null) {
            this.btnFiltredTrip = btnTp;
        } else {
            this.btnFiltredTrip = '';
        }
        
        this.tservice.getFiltredTrips1(this.id, this.chooseView, this.dateFiltredTrip, this.dateFiltredTrip2, 
            this.keyFiltredTrip, this.keyFiltredTrip1, this.keyFiltredTrip2, this.keyFiltredTrip3, this.keyFiltredTrip4, 
            this.btnFiltredTrip).subscribe(data => {
            this.result = data['_body'];

            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            for (let index = 0; index < this.jsonObj.length; index++) {
                this.items.push(this.jsonObj[index]);
            }
            this.itemsSearch = this.items;
            this.spinner.hide();
        });        

        //this.setCheckedTrip();     
    }

    getFiltredTrips(dateTp, keyTp, btnTp) {
        this.spinner.show();
        this.auth = localStorage.getItem('auth');
        console.log("login",this.auth);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.dataUser = this.currentUser.data[0];
        console.log(this.currentUser);
        if(this.auth === 'admin'){
            this.id = 'admin';
        }else{
            this.id = 'UT' + this.currentUser.data[0].idUser;
        }
        console.log(this.id);
        this.jsonObj = null;
        this.items = [];
        console.log('this.chooseView', this.chooseView);
        

        if (dateTp != null) {
            this.dateFiltredTrip = dateTp;
        } else {
            this.dateFiltredTrip = '';
        }
        
        if (keyTp != null) {
            this.keyFiltredTrip = keyTp;
        } else {
            this.keyFiltredTrip = '';
        }
        if (btnTp != null) {
            this.btnFiltredTrip = btnTp;
        } else {
            this.btnFiltredTrip = '';
        }
        
        this.tservice.getFiltredTrips(this.id, this.dateFiltredTrip, this.chooseView, this.keyFiltredTrip, this.btnFiltredTrip).subscribe(data => {
            this.result = data['_body'];

            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            for (let index = 0; index < this.jsonObj.length; index++) {
                this.items.push(this.jsonObj[index]);
            }
            this.itemsSearch = this.items;
            this.spinner.hide();
        });        
        
    }

    getFiltredTripsOnNext() {                        
        if (this.items.length !== 0) {
            let nextTripDate = this.items[this.items.length - 1].createdday;            
            this.prvBtnDisabled = false;
            this.nxtBtnDisabled = false;                        
            this.getFiltredTrips1(nextTripDate, (this.endDateFilter), this.searchTerm, this.clientFilter,
                this.stateFilter, this.enRetardFilter, this.payementStatusFilter, null);
        } else {
            console.log('this.items.length === 0');
            this.prvBtnDisabled = true;                        
            this.getFiltredTrips1((this.startDateFilter), (this.endDateFilter), this.searchTerm, this.clientFilter,
                this.stateFilter, this.enRetardFilter, this.payementStatusFilter, null);
        }        
    }

    getFiltredTripsOnPrevious() {                
        if (this.items.length !== 0) {
            let btnPrev = 'previous';
            let prevTripDate = this.items[0].createdday;            
            this.prvBtnDisabled = false;
            this.nxtBtnDisabled = false;                        
            this.getFiltredTrips1((this.startDateFilter), prevTripDate, this.searchTerm, this.clientFilter,
                this.stateFilter, this.enRetardFilter, this.payementStatusFilter, null);
        } else {            
            this.prvBtnDisabled = true;                        
            this.getFiltredTrips1((this.startDateFilter), (this.endDateFilter), this.searchTerm, this.clientFilter,
                this.stateFilter, this.enRetardFilter, this.payementStatusFilter, null);
        }         
    }

    selectAll(event) {
        this.checkedTrips = [];
        if(event.target.checked) {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].selected = true;
                this.checkedTrips.push(this.items[i]);
            }
        } else {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].selected = false;                
            }
            this.checkedTrips = [];
        }
    }
      checkIfAllSelected() {
        this.selectedAll = this.items.every(function(item:any) {
            return item.selected == true;
        });
      }

    onCheckboxChange(option, event) {
        if(event.target.checked) {
          this.checkedTrips.push(option);          
        } else {
          for(var i =0 ; i < this.items.length; i++) {
            if(this.checkedTrips[i] == option){
              this.checkedTrips.splice(i,1);
            }
          }
        }
        console.log(this.checkedTrips);
    }

    closeTrip() {
        for (var i = 0; i < this.checkedTrips.length; i++) {
            this.closedTrips.push(this.checkedTrips[i].idTrip);
        }
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        const urlCloseTrip = 'http://147.135.136.78:8052/trip/updateclosed';
        // http://147.135.136.78:8052/trip/updateclosed
        this.http.post(urlCloseTrip, this.closedTrips , options).subscribe(data => {
            console.log(data['_body']);
            this.snackBar.open('Modifications enregistrès avec succès', 'Fermer', {
                duration: 12000,
            });
        }, error => {
            console.log('error');
            this.snackBar.open('Echèc! Veuillez réessayer plus tard', 'Fermer', {
                duration: 5000,
            });
        });
    }

    getTripsOnInit() {
        console.log('numDisplayedElement', this.numDisplayedElement) ;
        this.auth = localStorage.getItem('auth');
        console.log('login',this.auth);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.dataUser = this.currentUser.data[0];
        console.log(this.currentUser);
        if(this.auth === "admin"){
            this.id = "Admin";
        }else{
            this.id = 'UT' + this.currentUser.data[0].idUser;
        }
        console.log(this.id);
       // let id="Admin";
        this.jsonObj = null;
        this.items = [];
        // let key = 'Item 1';
        this.tservice.getTripsFromServerOnInit(this.id).subscribe(data => {
            this.result = data['_body'];

            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            for (let index = 0; index < this.jsonObj.length; index++) {
                this.items.push(this.jsonObj[index]);
            }
            if (this.items.length === 20) {
                this.nDate = this.items[this.items.length - 1].createdday;
                this.pDate = this.items[0].createdday;
                this.nxtBtnDisabled = true;
                this.prvBtnDisabled = true;
            } else {
                this.nxtBtnDisabled = false;
                this.prvBtnDisabled = false;
            }

        });

        this.setCheckedTrip();
    }

    getTripsOnNext(nextDate) {
        this.jsonObj = null;
        this.items = [];
        // let key = 'Item 1';
        this.tservice.getTripsFromServerOnNext(this.id,nextDate).subscribe(data => {
            this.result = data['_body'];

            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            for (let index = 0; index < this.jsonObj.length; index++) {
                this.items.push(this.jsonObj[index]);
            }
            console.log(this.items.length);
            if (this.items.length === 20) {
                this.nDate = this.items[this.items.length - 1].createdday;
                this.pDate = this.items[0].createdday;
                this.nxtBtnDisabled = true;
                this.prvBtnDisabled = true;
            } else {
                this.nxtBtnDisabled = false;
            }
        });
        this.setCheckedTrip();
    }

    getTripsOnPrevious(previousDate) {
        this.jsonObj = null;
        this.items = [];
        // let key = 'Item 1';
        this.tservice.getTripsFromServerOnPrevious(this.id,previousDate).subscribe(data => {
            this.result = data['_body'];

            const jo = JSON.parse(this.result);
            const obj = Array.of(jo.data);
            this.jsonObj = obj[0];
            for (let index = 0; index < this.jsonObj.length; index++) {
                this.items.push(this.jsonObj[index]);
            }
            if (this.items.length === 20) {
                this.nDate = this.items[this.items.length - 1].createdday;
                this.pDate = this.items[0].createdday;
                this.prvBtnDisabled = true;
                this.nxtBtnDisabled = true;
            } else {
                this.prvBtnDisabled = false;
            }

        });
        this.setCheckedTrip();
    }

    /* applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dat.filter = filterValue;
    } */

    editTrip(content, trip) {        
        this.idTrip = trip.idTrip;
        this.obj = trip;
        this.objTrip.refTrip = this.obj.refTrip;
        this.objTrip.sourceTrip = this.obj.sourceTrip;
        this.objTrip.destTrip = this.obj.destTrip;
        this.objTrip.statusTrip = this.obj.statusTrip;
        this.objTrip.prevStatusTrip = this.obj.prevStatusTrip;
        this.objTrip.costTrip = this.obj.costTrip;
        this.objTrip.timingTrip = this.obj.timingTrip;
        this.objTrip.createdday = this.obj.createdday;
        this.objTrip.getedday = this.obj.getedday;
        this.objTrip.affectedday = this.obj.affectedday;
        this.objTrip.startdelday = this.obj.startdelday;
        this.objTrip.livredday = this.obj.livredday;
        this.objTrip.returnedday = this.obj.returnedday;
        this.objTrip.modeTrip = this.obj.modeTrip;
        this.objTrip.codeTrip = this.obj.codeTrip;
        this.objTrip.codeExp = this.obj.codeExp;
        this.objTrip.listdriverTrip = this.obj.listdriverTrip;
        this.objTrip.packageTrip = this.obj.packageTrip;
        this.objTrip.descriptionTrip = this.obj.descriptionTrip;
        this.objTrip.driverTrip = this.obj.driverTrip;
        console.log('this.objTrip.driverTrip', this.objTrip.driverTrip);
        // this.objTrip.id = this.obj.idTrip;

        // this.AskOfBonLiv(trip);
        this.open(content);        

    }

    infoTrip(content, trip) {
        this.obj = trip;
        this.objTrip.refTrip = this.obj.refTrip;
        this.objTrip.sourceTrip = this.obj.sourceTrip;
        this.objTrip.destTrip = this.obj.destTrip;
        this.objTrip.statusTrip = this.obj.statusTrip;
        this.objTrip.prevStatusTrip = this.obj.prevStatusTrip;
        this.objTrip.costTrip = this.obj.costTrip;
        this.objTrip.timingTrip = this.obj.timingTrip;
        this.objTrip.createdday = this.obj.createdday;
        this.objTrip.getedday = this.obj.getedday;
        this.objTrip.affectedday = this.obj.affectedday;
        this.objTrip.startdelday = this.obj.startdelday;
        this.objTrip.livredday = this.obj.livredday;
        this.objTrip.returnedday = this.obj.returnedday;
        this.objTrip.modeTrip = this.obj.modeTrip;
        this.objTrip.codeTrip = this.obj.codeTrip;
        this.objTrip.codeExp = this.obj.codeExp;
        this.objTrip.listdriverTrip = this.obj.listdriverTrip;
        this.objTrip.packageTrip = this.obj.packageTrip;
        this.objTrip.userTrip = this.obj.userTrip;
        this.objTrip.descriptionTrip = this.obj.descriptionTrip;
        this.objTrip.msgTrip = this.obj.msgTrip;
        if (this.obj.driverTrip != null) {
            this.objTrip.driverTrip = this.obj.driverTrip;
        }
        let photo = this.obj.packageTrip.imgPackage;
        if(photo != null) {
            const i = photo.indexOf(',');
            photo = photo.slice(i + 1, photo.length);
            const photoRes = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + photo);
            this.objTrip.image = photoRes;
        } else {
            this.objTrip.image = null;
        }

        console.log('this.objTrip.msgTrip: ', this.objTrip.msgTrip.length);

        this.open(content);
    }

    addTrip() {
        const a = $('#latGlobalDest').val();
        const b = $('#lngGlobalDest').val();
        const c = $('#cityGlobalDest').val();
        var regex=/^[0-9]+$/;        
           
            if (!this.selectedAdresseExp) {            
                this.snackBar.open('Veuillez sélectionner l\'adresse source!', 'Fermer', {
                    duration: 12000,
                });
                return;
            } else if (a === '' || b === '' || c === '') {
                this.snackBar.open("Veuillez remplir l'adresse de déstinataire!", "Fermer", {
                    duration: 5000,
                });
                return;
            } else if (!this.contactAdresseDest || !this.telContAdresseDest) {
                this.snackBar.open("Veuillez remplir le nom et le téléphone de déstinataire!", "Fermer", {
                    duration: 5000,
                });
                return;
            } else if (!this.telContAdresseDest.match(regex)) {
                this.snackBar.open("Le téléphone doit être un numéro", "Fermer", {
                    duration: 5000,
                });
                return;
            } else if (this.telContAdresseDest.length !== 8) {
                this.snackBar.open("Le numéro de téléphone est invalide", "Fermer", {
                    duration: 5000,
                });
                return;
            } else if (!this.selectedTripType) {
                this.snackBar.open("Veuillez sélectionner le type de colis!", "Fermer", {
                    duration: 5000,
                });
                return;
            } else if (!this.descriptionTrip) {
                this.snackBar.open("Veuillez remplir la description de colis!", "Fermer", {
                    duration: 5000,
                });
                return;
            } else if (!this.valueTrip) {
                this.snackBar.open("Veuillez remplir la valeur de colis!", "Fermer", {
                    duration: 5000,
                });
                return;
            } else if (!this.valueTrip.match(regex)) {
                this.snackBar.open("La valeur de colis doit être un numéro.", "Fermer", {
                    duration: 5000,
                });
                return;
            } else if (!this.modeLiv) {
                this.snackBar.open("Veuillez sélectionner le mode de livraison!", "Fermer", {
                    duration: 5000,
                });
                return;
            } else if (!this.typePaiement) {
                this.snackBar.open("Veuillez sélectionner le type de paiement!", "Fermer", {
                    duration: 5000,
                });
                return;
            }


        this.latGlobalDest = $('#latGlobalDest').val();
        this.lngGlobalDest = $('#lngGlobalDest').val();
        this.cityGlobalDest = $('#cityGlobalDest').val();
        console.log(this.latGlobalDest+'***'+this.lngGlobalDest + '***' + this.cityGlobalDest);

        const nowd = new Date();
        this.sizePack = ''+this.longueurTrip + 'X' + this.largeurTrip + 'X' + this.hauteurTrip;
        this.calculePrice();

        if (this.selectedTripType === 'doc' || this.selectedTripType === 'pack') {
            this.sizePack = null;
            this.poidsTrip = 0;
        }
        
        let labelAdrD = '';
        if (this.selectedAdresseDest != null) {
            labelAdrD = this.selectedAdresseDest.labelAdr;
        } else {
            labelAdrD = (<HTMLInputElement>document.getElementById('inputDestAdresseCity')).value;
        }

        this.tservice.addTrip(
            this.dataUser.nameUser, this.dataUser.emailUser, this.dataUser.rateUser, this.dataUser.idUser,
            this.dataUser.nbrateUser, this.dataUser.nbrdeliveryUser, this.dataUser.mobileUser, this.dataUser.surnameUser,
            this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng, this.selectedAdresseExp.contactAdr,
            this.selectedAdresseExp.mobileAdr, this.contactAdresseDest,
            this.telContAdresseDest, nowd, 'UT' + this.dataUser.idUser, this.dataUser.idUser,
            nowd, this.latGlobalDest, this.lngGlobalDest, this.modeLiv,
            this.pricePack, this.selectedTripType, this.valueTrip, this.poidsTrip,
            this.sizePack, this.typePaiement, 'REF', 'cherche un livreur',
            this.selectedAdresseExp.cityAdr, this.cityGlobalDest, this.base64textString[0], this.descriptionTrip,
            null, this.selectedAdresseExp.labelAdr, labelAdrD);

       window.location.reload();
       /* setTimeout(function() {
            this.getFiltredTrips(null, null, null);
       }, 5000);   */     
    }

    updatetrip() {
        if (localStorage.getItem('auth') === 'admin') {
            const stat = this.objTrip.statusTrip;
            if ((stat !== 'cherche un livreur' && (this.objTrip.driverTrip === null || this.objTrip.driverTrip === '' 
            || this.objTrip.driverTrip === undefined))) {
                this.snackBar.open('Echèc! Veuillez sélectionner le conducteur', 'Fermer', {
                    duration: 12000,
                });
                return;
            }
            /* if (((stat === 'Livreur en chemin' && (this.objTrip.affectedday === '' || this.objTrip.affectedday === null))  
             || (stat === 'Chez Livreur' && (this.objTrip.getedday === '' || this.objTrip.getedday === null)) 
             || (stat === 'livraison en cours' && (this.objTrip.startdelday === '' || this.objTrip.startdelday === null)) 
             || (stat === 'Livree' && (this.objTrip.livredday === '' || this.objTrip.livredday === null))  
             || (stat === 'Annulée' && (this.objTrip.returnedday === '' || this.objTrip.returnedday === null))
             || (stat === 'Retour' && (this.objTrip.returnedday === '' || this.objTrip.returnedday === null)))) {
                this.snackBar.open('Echèc! Veuillez vérifier les champs date', 'Fermer', {
                    duration: 12000,
                });
                return;
             } */
        }

        let drv = this.getSelectedDriver(this.objTrip.driverTrip);
        
        this.update(this.objTrip.destTrip.contactAdr, this.objTrip.destTrip.cityAdr, this.objTrip.destTrip.mobileAdr,
             this.objTrip.timingTrip, this.objTrip.statusTrip, this.objTrip.prevStatusTrip,
                    this.objTrip.createdday, this.objTrip.affectedday, this.objTrip.getedday,
                    this.objTrip.startdelday, this.objTrip.livredday, this.objTrip.returnedday,
                    this.objTrip.costTrip, this.objTrip.packageTrip.valPackage, this.objTrip.descriptionTrip, drv);
                    // window.location.reload();
    }

    getSelectedDriver(driverTrip) {
        if (driverTrip !== null) {
            for(let i = 0; i < this.Listdriver.length; i++) {
                const idd = 'DT' + this.Listdriver[i].idDriver ;
                if (idd === driverTrip.idDriver) {
                    driverTrip = this.Listdriver[i];
                    return;
                }
            }
        }
        console.log('driverTrip', driverTrip);
        return driverTrip;
    }

    update(contactAdr, cityAdr, mobileAdr, timingTrip, statusTrip, prevStatusTrip, createday, affectedday, getedday, startdelday, livredday,
         returnedday, costTrip, valTrip, descriptionTrip, driver) {

        let x = null;
        if (driver != null) {
            console.log(driver);
            if(driver.createdday != null) {
                driver.createdday = new Date(driver.createdday);
            } 
            if(driver.updateday != null) {
                driver.updateday = new Date(driver.updateday);
            }   
            if(driver.lastUpdate != null) {
                driver.lastUpdate = new Date(driver.lastUpdate);
            }      
                    
          for (let i = 0; i < driver.vehicleDriver.length; i++) {
              if(driver.vehicleDriver[i].createdday != null) {
                driver.vehicleDriver[i].createdday = new Date(driver.vehicleDriver[i].createdday);
              }
              if(driver.vehicleDriver[i].updateday != null) {
                driver.vehicleDriver[i].updateday = new Date(driver.vehicleDriver[i].updateday);
              }                        
          }
          x = [driver];
        }

         if (createday != null) {
             createday = new Date(createday);
         }
         if (affectedday != null) {
            affectedday = new Date(affectedday);
          }
          if (getedday != null) {
            getedday = new Date(getedday);
          }
          if (startdelday != null) {
            startdelday = new Date(startdelday);
          }
          if (livredday != null) {
            livredday = new Date(livredday);
          }
          if (returnedday != null) {
            returnedday = new Date(returnedday);
          }

        const tripData = {
            destTrip: {
                contactAdr: contactAdr,
                mobileAdr: mobileAdr,
                cityAdr: cityAdr
            },
            timingTrip: timingTrip,
            statusTrip: statusTrip,
            prevStatusTrip: prevStatusTrip,
            createdday: createday,
            affectedday: affectedday,
            getedday: getedday,
            startdelday: startdelday,
            livredday: livredday,
            returnedday: returnedday,
            costTrip: costTrip,
            descriptionTrip: descriptionTrip,
            listdriverTrip: x,
            packageTrip: {
                valPackage: valTrip
            }
        };
        console.log('data=', tripData);
        this.tservice.updateTrip(tripData, this.idTrip).subscribe(data => {
            const result = data['_body'];
            console.log(data['_body']);
            const jo = JSON.parse(result);
            const obj = Array.of(jo.data);
            this.getFiltredTrips(null, null, null);
            this.snackBar.open('La modification a été effectuée avec succès', 'Fermer', {
                duration: 5000,
            });
           }, error => {
            console.log(error); // Error getting the data
            this.snackBar.open('Echèc! Veuillez réessayer plus tard', 'Fermer', {
                duration: 5000,
            });
          });
    }

    getAllDrivers() {
        this.tservice.getDrivers().subscribe(data => {
         this.result = data['_body'];
         // console.log(data['_body'])
         const jo = JSON.parse(this.result);
         const obj = Array.of(jo.data);
         this.jsonObj = obj[0];
         this.Listdriver = this.jsonObj;
         console.log('listdriver!::', this.Listdriver);
       }, error => {
         // console.log(error);
       });
    }

    show1() {
        document.getElementById('div_dimensions').style.display = 'none';
        console.log('none');
        this.distancePack = this.calculateDistance(this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng,
            this.latGlobalDest, this.lngGlobalDest, 'K' );
        console.log('distancePack', this.distancePack);
        const address = (<HTMLInputElement>document.getElementById('cityGlobalDest')).value;
        // $( '#cityGlobalDest' ).val(address);
        this.getLatitudeLongitudeFromAddress(this.showResult, address);
      }
      show2() {
        document.getElementById('div_dimensions').style.display = 'block';
        console.log('block');
        this.distancePack = this.calculateDistance(this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng,
            this.latGlobalDest, this.lngGlobalDest, 'K' );
        console.log('distancePack', this.distancePack);
        const address = (<HTMLInputElement>document.getElementById('cityGlobalDest')).value;
        // $( '#cityGlobalDest' ).val(address);
        this.getLatitudeLongitudeFromAddress(this.showResult, address);
      }

      onUploadChange(evt: any) {
        const file = evt.target.files[0];

        if (file) {
          const reader = new FileReader();

          reader.onload = this.handleReaderLoaded.bind(this);
          reader.readAsBinaryString(file);
        }
      }

      handleReaderLoaded(e) {
        this.base64textString = [];
        this.base64textString.push('data:image/jpeg;base64,' + btoa(e.target.result));
      }

    onChangeDisplayedElement() {

        this.spinner.show();
        // this.getTrips();
        this.getFiltredTrips(null, null, null);

    }

    onClickAdrExp() {
        console.log('Addresse Exp name', this.selectedAdresseExp);
        this.cityAdresseExp = this.selectedAdresseExp.cityAdr;
        this.contactAdresseExp = this.selectedAdresseExp.contactAdr;
        this.telContAdresseExp = this.selectedAdresseExp.mobileAdr;        
    }

    onClickAdrDest() {
        if (!this.selectedAdresseExp) {            
            this.snackBar.open('Merci de sélectionner l\'adresse source!', 'Fermer', {
                duration: 12000,
            });
            return;
        } else {
            console.log('Addresse Dest name', this.selectedAdresseDest);
            this.cityAdresseDest = this.selectedAdresseDest.cityAdr;
            this.contactAdresseDest = this.selectedAdresseDest.contactAdr;
            this.telContAdresseDest = this.selectedAdresseDest.mobileAdr;

            $('#latGlobalDest').val(this.selectedAdresseDest.geolocAdr.lat);
            $('#lngGlobalDest').val(this.selectedAdresseDest.geolocAdr.lng);
            $('#cityGlobalDest').val(this.selectedAdresseDest.cityAdr);

            this.distancePack = this.calculateDistance(this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng,
                this.selectedAdresseDest.geolocAdr.lat, this.selectedAdresseDest.geolocAdr.lng, 'K' );
            console.log('distancePack', this.distancePack);

            /* let p1  = new google.maps.LatLng(this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng);
            let p2  = new google.maps.LatLng(this.selectedAdresseDest.geolocAdr.lat, this.selectedAdresseDest.geolocAdr.lng);
            this.calculeDistance(p1, p2, this.distancePack); */
        }
    }

    deleteTrip(trip) {
        if (localStorage.getItem('auth') === 'admin') {
            this.tservice.deleteTrip(trip.idTrip, trip.statusTrip);
            $('#trip-row-' + trip.idTrip).hide('slow', function() {
                    $(this).remove();
            });
        } else if ( ( trip.statusTrip !== 'Chez Livreur' || trip.statusTrip !== 'livraison en cours' 
        || ( (trip.statusTrip !== 'Livree') && (!(trip.isClosed)) ) ) ) {
            this.tservice.deleteTrip(trip.idTrip, trip.statusTrip);
            $('#trip-row-' + trip.idTrip).hide('slow', function() {
                    $(this).remove();
            });
                
        } else {
            this.snackBar.open('Impossible de supprimer le colis.', 'Fermer', {
                duration: 12000,
            });            
        }               
    }


    // f1
    calculeDistance(pt1, pt2, distance) {
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
            origins: [pt1],
            destinations: [pt2],
            travelMode: google.maps.TravelMode['DRIVING'],
            avoidHighways: false,
            avoidTolls: false,
            }, callback.bind(this));

        function callback(response) {
            distance = response.rows[0].elements[0].distance.value;
            this.distancePack = response.rows[0].elements[0].distance.value;
            console.log('distancePackkk', this.distancePack);
        }
    }

    calculateDistance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        } else {
            const radlat1 = Math.PI * lat1 / 180;
            const radlat2 = Math.PI * lat2 / 180;
            const theta = lon1 - lon2;
            const radtheta = Math.PI * theta / 180;
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit === 'K') { dist = dist * 1.609344; }
            if (unit === 'N') { dist = dist * 0.8684; }
            return dist;
        }
    }

    // f2
    calculePrice() {
        if (this.selectedTripType === 'doc' || this.selectedTripType === 'pack') {
          this.pricePack = 6;
          if (this.modeLiv === 'immediate') {
              this.pricePack = this.pricePack + this.percentage(this.pricePack, 50);
          }
          } else if (this.selectedTripType === 'packbig') {

                if (this.modeLiv === 'immediate') {
                    // console.log(this.distancePack)
                    this.pricePack = 6;
                    this.pricePack = this.pricePack + this.calculeExtraWieght(this.pricePack, this.poidsTrip);
                    this.pricePack = this.pricePack + ((this.distancePack / 1000) * 0.3);
                } else if (this.modeLiv === '24H') {
                    this.pricePack = 6;
                    this.pricePack = this.pricePack + this.calculeExtraWieght(this.pricePack, this.poidsTrip);
                    console.log('prriiiiiiiiic', this.pricePack);
                } else if (this.modeLiv === '48H') {
                    this.pricePack = 6;
                    this.pricePack = this.pricePack + this.calculeExtraWieght(this.pricePack, this.poidsTrip);
              }
            }
            this.pricePack = Number(this.pricePack.toFixed());
    }

    percentage(num, per) {
      return (num / 100) * per;
    }

    calculeExtraWieght(price, wieght) {
    let extraWieght = 0 ;

    if (this.poidVol > wieght) {
        wieght = this.poidVol;
    }

    // console.log("poidVol "+ this.poidVol);
    // console.log("poidVol "+ wieght);

    if (wieght > 10 && wieght <= 30) {
        extraWieght = (wieght - 10) * 0.5;
        price = price + extraWieght;
    } else if (wieght > 30 && wieght <= 50) {
        extraWieght = (wieght - 10) * 0.45;
        price = price + extraWieght;
    } else if (wieght > 50 && wieght <= 100) {
        extraWieght = (wieght - 10) * 0.4;
        price = price + extraWieght;
    } else if (wieght > 100 && wieght <= 200) {
        extraWieght = (wieght - 10) * 0.35;
        price = price + extraWieght;
    } else if (wieght > 200) {
        extraWieght = (wieght - 10) * 0.3;
        price = price + extraWieght;
    }
    console.log('wwwwwwwwwwwww', wieght);
    console.log('extraaaaaaaaa', extraWieght);
    return extraWieght;
    }


    checkedTrip(trp) {
        let sid = trp.idTrip;
        console.log('sid: ', sid);
        let findInCheckedList = false;
        if (this.checkedTrips.length === 0) {
            console.log('list vide');
            this.checkedTrips.push(trp);
        } else {
            console.log('list non vide');
        /* if (this.checkedTrips != null && this.checkedTrips.length === 0) { */
            for (let i = 0; i < this.checkedTrips.length; i++) {
                console.log('this.checkedTrips[i].idTrip: ', this.checkedTrips[i].idTrip);
                if (this.checkedTrips[i].idTrip === sid) {
                    console.log('idTrip === sid');
                    this.checkedTrips.splice(i, 1);
                    findInCheckedList = true;
                } else {
                    console.log('idTrip !== sid');
                    findInCheckedList = false;
                }
            }
            if (findInCheckedList === false) {
                this.checkedTrips.push(trp);
            }
        }

        console.log(this.checkedTrips);
    }

    setCheckedTrip() {
        if (this.checkedTrips != null) {
            for (let i = 0; i < this.checkedTrips.length - 1; i++) {
                const sid = this.checkedTrips[i].idTrip;
                $('#checked-trip-' + sid).attr( 'checked' );
            }
            console.log('checked okiiiiiii');
        }
    }


    public generateDechargeForAdmin() {
        const data = document.getElementById('contentToConvert');
        let dj = new Date();
        this.dateJ = this.changeDateFormatDMY2(dj);
        html2canvas(data).then(canvas => {
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / (canvas.width * 1.5);
        const heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('/layout/assets/images/logo.png');
        const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('Manifeste_' + this.dateJ + '.pdf');
        for (let i = 0; i < this.checkedTrips.length; i++) {
            const sid = this.checkedTrips[i].idTrip;
            $('#checked-trip-' + sid).prop('checked', false);
        }
        this.checkedTrips = [];
        this.dateJ = '';
        this.totalTripInManifest = '';
        this.fraixTotal = '';
        this.valeurTotal = '';
        });


        /*heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        pdf.save('MYBL.pdf'); // Generated PDF
        }); */
    }

    public generateBLivraison() {
        const data = document.getElementById('contentBlToConvert');
        let idt = this.tripBl.refTrip;
        html2canvas(data).then(canvas => {
        const imgWidth = 210;
        const pageHeight = 200;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('/layout/assets/images/logo.png');
        const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, 190);
        pdf.save('BonDeLivraison_' + idt + '.pdf');
        });
    }


    // generate PDF Bon de Livrason
    AskOfBonLiv(trip) {
        console.log(this.auth);
        this.tservice.AskOfBonLiv(trip.idTrip, this.auth).subscribe(data => {
            console.log(data['_body']);
        });
    }

    changeDateFormat(dd){
        let d = new Date(dd);
        const day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        let hour = d.getHours();
        let min = d.getMinutes();
        // var sec = d.getSeconds();
        const dformat = [day, month, year].join('/') + ' ' + [hour, min].join(':');

        return dformat;
    }

    changeDateFormatMDY(dd){
        let d = new Date(dd);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        const dformat = [month, day, year].join('/');

        return dformat;
     }

    changeDateFormatDMY(dd){
        let d = new Date(dd);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        const dformat = [day, month, year].join('/');

        return dformat;
     }
     changeDateFormatDMY2(dd){
        let d = new Date(dd);
        let day = d.getDate();
        const month = d.getMonth() + 1;
        let year = d.getFullYear();
        const dformat = [day, month, year].join('-');

        return dformat;
     }

     splitDateFormatMDY(dd) {
        let dformat = '';
        if (dd != null) {
            const d = '' + dd;
            const arr = d.split('-');
            dformat = arr[1] + '/' + arr[2] + '/' + arr[0];
        }
        return dformat;
      }

    generateDechargeForClient() {
        const doc = new jsPDF();
        doc.autoTable({html: '#contentToConvert'});
        doc.save('Decharge.pdf');

    }

    filterItems(searchTerm) {
        // console.log('itemsss: ', this.items);

        return this.items.filter((item) => {
            let nomEx: any; let nomDes: any; let mobileEX: any; let mobileDes: any; let nomDr: any; let mobileDr: any;

            if (item.userTrip != null && item.userTrip.nameUser != null) {
                nomEx = item.userTrip.nameUser.toString();
            } else {
                nomEx = ' ';
            }
            if (item.destTrip != null && item.destTrip.contactAdr != null) {
                nomDes = item.destTrip.contactAdr.toString();
            } else {
                nomDes = ' ';
            }
            if (item.userTrip != null && item.userTrip.mobileUser != null) {
                mobileEX = item.userTrip.mobileUser.toString();
            } else {
                mobileEX = ' ';
            }
            if (item.destTrip != null && item.destTrip.mobileAdr != null) {
                mobileDes = item.destTrip.mobileAdr.toString();
            } else {
                mobileDes = ' ';
            }
            if (item.driverTrip != null && item.driverTrip.nameDriver != null) {
                nomDr = item.driverTrip.nameDriver.toString();
            } else {
                nomDr = ' ';
            }
            if (item.driverTrip != null && item.driverTrip.mobileDriver != null) {
                mobileDr = item.driverTrip.mobileDriver.toString();
            } else {
                mobileDr = ' ';
            }

            return item.statusTrip.indexOf(searchTerm) > -1
                    || item.refTrip.indexOf(searchTerm) > -1
                    || nomEx.indexOf(searchTerm) > -1
                    || nomDes.indexOf(searchTerm) > -1
                    || mobileEX.indexOf(searchTerm) > -1
                    || mobileDes.indexOf(searchTerm) > -1
                    || item.createdday.indexOf(searchTerm) > -1
                    || nomDr.indexOf(searchTerm) > -1
                    || mobileDr.indexOf(searchTerm) > -1
                    ;

        });

      }

      setFilteredItems() {

        this.items = [];
        /* if (this.items !== undefined) {
          this.items = this.itemsSearch;
          this.items = this.filterItems(this.searchTerm);
        } */
        // this.getFiltredTrips(null, this.searchTerm, null);
        this.getFiltredTrips1(this.startDateFilter, this.endDateFilter, this.searchTerm, this.clientFilter,
            this.stateFilter, this.enRetardFilter, this.payementStatusFilter, null);

      }

      searchPlaces() {

        this.input = document.getElementById('inputDestAdresseCity');
        const searchBox = new google.maps.places.SearchBox(this.input);
        searchBox.addListener('places_changed', function() {
           const places = searchBox.getPlaces();
           console.log(this.palces);
           let address = '';
           if (places[0].address_components) {
             address = [
               (places[0].address_components[0] && places[0].address_components[0].long_name || ''),
               (places[0].address_components[1] && places[0].address_components[1].long_name || ''),
               (places[0].address_components[2] && places[0].address_components[2].long_name || ''),
               (places[0].address_components[3] && places[0].address_components[3].long_name || '')
             ].join(' ');
           }
           $('#latGlobalDest').val(places[0].geometry.location.lat());
           $('#lngGlobalDest').val(places[0].geometry.location.lng());
           $('#cityGlobalDest').val(address);
           console.log(address);
           console.log(places[0].geometry.location.lat());
           console.log(places[0].geometry.location.lng());

          if (places.length === 0) {
            return;
          }
       });

       this.latGlobalDest = $('#latGlobalDest').val();
       this.lngGlobalDest = $('#lngGlobalDest').val();

       /* this.distancePack = this.calculateDistance(this.selectedAdresseExp.geolocAdr.lat, this.selectedAdresseExp.geolocAdr.lng,
        this.latGlobalDest, this.lngGlobalDest, 'K' );
    console.log('distancePack', this.distancePack); */



    }

    onClickPreMsg() {
        console.log('inputPreMessageToClient: ', this.inputPreMessageToClient);
        console.log('inputCusMessageToClient: ', this.inputCusMessageToClient);
        this.addMsg();
    }

    openLinkPos(idtrip) {
        window.open('http://pw.dotways.fr/?pack=' + idtrip, '_blank');
    }

    openMsgModal(content, trp) {
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        this.trpMsg = trp;
    }

    addMsg(){

        let msg = '';
        if (!this.inputPreMessageToClient && !this.inputCusMessageToClient) {
            this.snackBar.open('Veuillez entrer un message!', 'Fermer', {
                duration: 12000,
            });
            return;
        }
        if (this.inputCusMessageToClient) {
            msg = this.inputCusMessageToClient;
        } else {
            msg = this.inputPreMessageToClient;
        }

        let date = new Date();
        let headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        const msgdata = {
          msgTrip : [{
            ownerMsg: localStorage.getItem('auth'),
            contentMsg: msg,
            dateMsg: date
          }]
          }

        this.http.put('http://147.135.136.78:8052/trip/update/' + this.trpMsg.idTrip, msgdata , options).subscribe(data => {
            this.snackBar.open('Message envoyé avec succès.', 'Fermer', {
                duration: 5000,
            });
            }, error => {
            console.log(error); // Error getting the data
        });
      }

    getGovAndDelegOfTunisia() {
        const gouvernorat = $( '#gouvernorat' );
        const delegation = $( '#delegation' );
        TunisiaGovAndDelg.loadGovAndDelegOfTunisia(gouvernorat, delegation);
    }

    getLatLngFromGov() {
        /* const gov = (<HTMLInputElement>document.getElementById('gouvernorat')).value;
        console.log('gooov ', gov);
        const address = gov + ', Tunisie'; */
        const address = (<HTMLInputElement>document.getElementById('cityGlobalDest')).value;
        this.getLatitudeLongitudeFromAddress(this.showResult, address);
      }

      getGovAndDelegFromIndex() {
        const gov = $( '#gouvernorat' ).val();
        const del = $( '#delegation' ).val();
        const compoAdr = $( '#cityGlobalDest' );
        TunisiaGovAndDelg.getGovAndDelegFromIndex(gov, del, compoAdr);
        const address = (<HTMLInputElement>document.getElementById('cityGlobalDest')).value;
        console.log('address ', address);
      }

      getLatitudeLongitudeFromAddress(callback, address) {
        address = address || 'Tunis, Tunisie';
        // Initialize the Geocoder
        const geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    callback(results[0]);
                }
            });
        }
      }
      showResult(result) {
        // (<HTMLInputElement>document.getElementById('latitude2')).value = result.geometry.location.lat();
        // (<HTMLInputElement>document.getElementById('longitude2')).value = result.geometry.location.lng();
        $( '#latGlobalDest' ).val(result.geometry.location.lat());
        $( '#lngGlobalDest' ).val(result.geometry.location.lng());
      }

    showStatusTrip(trip) {
          this.changeColorByStatusTrip = false;
          this.dnow = new Date().getTime();
          const dif = Number('172800000');
          let d1;

          /* if (trip.getedday != null) {
            const dramassage = new Date(trip.getedday).getTime();
            const diff = this.dnow - dramassage;
            if ((diff >=  dif) && (trip.nbTentative === 0) && (trip.statusTrip !== 'Livree')) {
                this.changeColorByStatusTrip = true;
             } else {
                this.changeColorByStatusTrip = false;
             }
          } else {
            this.changeColorByStatusTrip = true;
          }
          return this.changeColorByStatusTrip; */
        if (trip.statusTrip === 'cherche un livreur') {
            d1 = new Date(trip.createdday).getTime();
        } else if (trip.statusTrip === 'Livreur en chemin') {
                d1 = new Date(trip.affectedday).getTime();
          } else if (trip.statusTrip === 'Chez Livreur') {
                    d1 = new Date(trip.getedday).getTime();
            } else if (trip.statusTrip === 'livraison en cours') {
                        d1 = new Date(trip.startdelday).getTime();
             } else if (trip.statusTrip === 'Livree') {
                            d1 = new Date(trip.livredday).getTime();
              } else if (trip.statusTrip === 'Retour') {
                                d1 = new Date(trip.returnedday).getTime();
               }
        const diff = this.dnow - d1;
        if ((diff >=  dif) && (trip.nbTentative === 0)) {
            this.changeColorByStatusTrip = true;
        } else {
            this.changeColorByStatusTrip = false;

        }

        return this.changeColorByStatusTrip;
    }


    onFileChange(evt: any, contentImport) {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        console.log('type', target.files[0].type);
        let typeFile = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        if (target.files[0].type !== typeFile) {
            this.snackBar.open("Échec, le fichier est invalide, les extensions autorisées sont: .xlxs et xls.", "Fermer", {
                duration: 5000,
            });
            return;
        } else {
            const reader: FileReader = new FileReader();
            reader.onload = (e: any) => {
                /* read workbook */
                const bstr: string = e.target.result;
                const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
    
                /* grab first sheet */
                const wsname: string = wb.SheetNames[0];
                const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    
                /* save data */
                this.tripsFromExcelTemp = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
                this.tripsFromExcel = this.tripsFromExcelTemp;
                this.tripsFromExcel.shift();
                            
            };
            reader.readAsBinaryString(target.files[0]);
            this.openSm(contentImport);
        }		
    }
    
    tripsFromExcelAdrLatLng() {
        if (this.tripsFromExcel !== null && this.tripsFromExcel.length > 0) {
            let city = '';
            for(let i=0; i<this.tripsFromExcel.length; i++) {
                city = ''+ this.tripsFromExcel[i][2] +', '+ this.tripsFromExcel[i][3] +', '+ this.tripsFromExcel[i][4] +', '+ this.tripsFromExcel[i][5];
                console.log(city);
                this.tripsFromExcel[i].push(city);
                this.getLatitudeLongitudeFromAddress2(this.showResult2, city, this.tripsFromExcel, i);
            }
        }
    }    

    getLatitudeLongitudeFromAddress2(callback, address, tripsFromExcel, index) {
        address = address || 'Tunis, Tunisie';
        // Initialize the Geocoder
        const geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    tripsFromExcel[index].push(results[0].geometry.location.lat());
                    tripsFromExcel[index].push(results[0].geometry.location.lng());
                    callback(results[0], address, index);
                }
            });
        }
      }

    showResult2(result, address, index) {
        console.log('index '+index, result.geometry.location.lat());
        console.log('index '+index, result.geometry.location.lng());  
    }

    showArrayTrip() {
        console.log(this.tripsFromExcel);
    }

    addTripsFromExcelFile() {        				
        const nowd = new Date();
		const tripType = 'pack';
        const sizePack = null;
        const poidsTrip = 0;  
		const modeLiv = '24H';		        
        const labelAdrD = '';  		
		const pricePack = 6;
        const typePaiement = 'Contre remboursement';
        var regex=/^[0-9]+$/;
        let checkValidFile = true;
        
        if (this.tripsFromExcel !== null && this.tripsFromExcel.length > 0) {
            for(let i=0; i<this.tripsFromExcel.length; i++) {
                const contactAdresseDest = this.tripsFromExcel[i][0];
                const telContAdresseDest = this.tripsFromExcel[i][1]; 
                const descriptionTrip = this.tripsFromExcel[i][6];
                const valueTrip = this.tripsFromExcel[i][7];
                const cityGlobalDest = this.tripsFromExcel[i][8];
                const latGlobalDest = this.tripsFromExcel[i][9];
                const lngGlobalDest = this.tripsFromExcel[i][10];
                
                if ((descriptionTrip === undefined) || (valueTrip === undefined) || (telContAdresseDest === undefined) 
                || (contactAdresseDest === undefined) || (cityGlobalDest === undefined)) {
                    checkValidFile = false;
                    this.snackBar.open("Échec de l'importation, veuillez réessayer. Assurez-vous d'importer un fichier valide.", "Fermer", {
                        duration: 5000,
                    });
                    return;
                } else if ((descriptionTrip === null || descriptionTrip === '') || (valueTrip === null || valueTrip === '' || !valueTrip.match(regex)) 
                || (telContAdresseDest === null || telContAdresseDest === '' || !telContAdresseDest.match(regex)) 
                || (contactAdresseDest === null || contactAdresseDest === '') || (cityGlobalDest === null || cityGlobalDest === '')) {
                    checkValidFile = false;
                    this.snackBar.open("Échec de l'importation, veuillez réessayer. Assurez-vous d'importer un fichier valide.", "Fermer", {
                        duration: 5000,
                    });
                    return;
                }
                this.tservice.addTrip(
                    this.dataUser.nameUser, this.dataUser.emailUser, this.dataUser.rateUser, this.dataUser.idUser,
                    this.dataUser.nbrateUser, this.dataUser.nbrdeliveryUser, this.dataUser.mobileUser, this.dataUser.surnameUser,
                    this.selectedAdresseExpExcel.geolocAdr.lat, this.selectedAdresseExpExcel.geolocAdr.lng, this.selectedAdresseExpExcel.contactAdr,
                    this.selectedAdresseExpExcel.mobileAdr, contactAdresseDest,
                    telContAdresseDest, nowd, 'UT' + this.dataUser.idUser, this.dataUser.idUser,
                    nowd, latGlobalDest, lngGlobalDest, modeLiv,
                    pricePack, tripType, valueTrip, poidsTrip,
                    sizePack, typePaiement, 'REF', 'cherche un livreur',
                    this.selectedAdresseExpExcel.cityAdr, cityGlobalDest, null, descriptionTrip,
                    null, this.selectedAdresseExpExcel.labelAdr, labelAdrD);
            }
            window.location.reload();    
        } else {
            this.snackBar.open("Échec de l'importation, veuillez réessayer. Assurez-vous d'importer un fichier valide.", "Fermer", {
                duration: 5000,
            });
        }		       
    }
    



}


