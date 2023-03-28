import { Component } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

interface Teams{
  teams:Array<Team>;
}
interface Dates{
  dates:Array<Date>
}
interface Date{
  date:string;
}
interface Team {
  value: string;
  viewValue: string;
  name:string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'Weekly schedule';
  constructor(private _http:HttpClient){}

  teams: any = [];
  public getTeams(){
    return this._http.get<Teams>('https://statsapi.web.nhl.com/api/v1/teams')
  }
  ngOnInit(){

    this.getTeams().subscribe((data) => this.teams = {
      teams: data.teams,
    });
  }
  selectedTeam = '';
  dates:any = [];


  public getSchedulesByTeam(teamId:string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("teamId",teamId).append("startDate", "2023-01-01");
    return this._http.get<Dates>('https://statsapi.web.nhl.com/api/v1/schedule',{params:queryParams})
  }

  onSelected(value:string): void {
    this.selectedTeam = value;
    this.getSchedulesByTeam(this.selectedTeam).subscribe((data)=>this.dates ={
      dates:data.dates,
    })
  }
}

