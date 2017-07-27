import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectSharedService } from "../../shared/services/project-shared.service";
import { ProjectService } from "../../dashboard/services/project.service";

declare var Materialize:any;
@Component({
  selector: 'app-project-config',
  templateUrl: './project-config.component.html',
  styleUrls: ['./project-config.component.css']
})
export class ProjectConfigComponent implements OnInit {

  projectName;
  projectImage;
  projectDescription={value:''};
  constructor(private projectSharedService:ProjectSharedService,
  private projectService:ProjectService,
    private router: Router ) { }

  ngOnInit() {
    this.projectImage = this.projectSharedService.project.img;
    this.projectName = this.projectSharedService.project.name;
    this.projectDescription.value=this.projectSharedService.project.description;
  }
  update(){
    if(this.projectName.trim().length==0){
      Materialize.toast('ProjectName required', 3000, 'rounded')
    }else{
      this.projectService.update({
        name:this.projectName,
        description:this.projectDescription.value,
        img:this.projectImage,
      },this.projectSharedService.project._id).subscribe(
        response=>{
          Materialize.toast('Saved successfully', 3000, 'rounded')
          this.projectSharedService.project.img=this.projectImage;
          this.projectSharedService.project.name=this.projectName;
          this.projectSharedService.project.description=this.projectDescription.value;
        }
      );
    }
  }
  delete(){
    this.projectService.delete(this.projectSharedService.project._id).subscribe(
      response=>{
        this.router.navigate(['/dashboard']);
      }
    );
  }
  onImgUpload(event){
   var files = event.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
    _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.projectImage = btoa(binaryString);
  }
}
