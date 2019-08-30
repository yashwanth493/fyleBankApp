import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public ShowBankData: any = [];
  public items: any = [];
  searchTerm: any;
  askToSelect = true;
  showLoading: boolean;
  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    this.setFilteredItems();
  }

  capitalChanged(value) {
    this.askToSelect = false;
    this.showLoading = true;
    this.http.get('https://vast-shore-74260.herokuapp.com/banks?city=' + value.detail.value)
      .subscribe((responseBankData) => {
        this.showLoading = false;
        this.ShowBankData = responseBankData;
        this.items = this.ShowBankData;
      });
  }

  filterBank(searchTerm) {
    return this.ShowBankData.filter(item => {
      return Object.keys(item).some(
        k =>
          item[k] != null &&
          item[k]
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    });
  }

  setFilteredItems() {
    this.items = this.filterBank(this.searchTerm);
  }

  // https://vast-shore-74260.herokuapp.com/banks?city=BANGLORE

}
