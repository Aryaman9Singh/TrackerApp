import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExportService } from '../export-service.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  @Input() searchText: string = '';
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() clearSearchEvent = new EventEmitter<void>();
  constructor(
    private exportService: ExportService
  ) {}
  exportToExcel() {
    this.exportService.triggerExportToExcel();
  }

  ngOnInit(): void {}
  dropdownOpen = false;
username: string = this.formatUsername(localStorage.getItem('username') || '');

  
onSearchTextChange() {
    this.searchTextChange.emit(this.searchText);
  }

  clearSearch() {
    this.clearSearchEvent.emit();
  }
private formatUsername(username: string): string {
    
    const match = username.match(/^[a-zA-Z]+/);
    if (match) {
      return match[0].toLowerCase().charAt(0).toUpperCase() + match[0].toLowerCase().slice(1);
    }
    return username; 
  }


  logout(){
    console.log("logout button clicked")
    sessionStorage.clear();
  }
  changePassword(){
    alert("Method not implemented..!")
  }
  
  toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    }
  showDropdown() {
    this.dropdownOpen = true;
  }
  
  hideDropdown() {
    this.dropdownOpen = false;
  }
}
