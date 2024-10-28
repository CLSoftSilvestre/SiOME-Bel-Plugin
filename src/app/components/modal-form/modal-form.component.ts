import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SiomeApiProviderService } from '../../services/siome-api-provider.service';
import { ISiomeApi } from '../../shared/public-api/interfaces/siome-api.interface';
import { NodeClass } from 'src/app/shared/public-api/enums/node-classes';
import { IAddObjectParameter } from 'src/app/shared/public-api/interfaces/add-object-parameter';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.css'
})

export class ModalFormComponent implements OnInit {

  form!: FormGroup;

  constructor (private siomeApiProvider: SiomeApiProviderService, private fb: FormBuilder, public dialogRef: MatDialogRef<ModalFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      manufacturer: ['', Validators.nullValidator],
      model: ['', Validators.nullValidator],
      serial: ['', Validators.nullValidator],
      year: ['', Validators.nullValidator],
      location: ['', Validators.nullValidator]
    });
  }

  private get siomeApi(): ISiomeApi {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.siomeApiProvider.siomeApi!;
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSubmit() {
    //console.log(this.data.model.name);
    //console.log(this.form.value.name);

    await this.siomeApi.createLogNode("Bel Plugin");

    if (!this.form.valid){
      this.form.markAllAsTouched();
      await this.siomeApi.newLogEntry("Error instantiating the model type "+ this.data.model.name + ". Please check the equipments information.", "error");

    } else {
      this.dialogRef.close(this.form.value);
      await this.siomeApi.newLogEntry("Instantiating the model type " + this.data.model.name + " into server objects.", "info");

      // Check if namespace exist otherwise create it
      const namespaceArray = await this.siomeApi.getNamespaceArray()
      if(namespaceArray.includes("http://groupe-bel.com/Models/Instances/") === false ) {
        await this.siomeApi.createNamespaceImplicit("http://groupe-bel.com/Models/Instances/", "0.1")
      }

      // Check the namespace index
      const namespaceIndex = await this.siomeApi.currentNamespaceIndex()

      // Add instance of node to Machines folder
      const params: IAddObjectParameter = {
        name: this.form.value.name,
        nodeClass: NodeClass.Object,
        referenceType: 'ns=0;i=35',
        namespaceIndex: namespaceIndex,
        typeDefinition: this.data.model.id // was ns=0;i=58 (Type of object)
      }
  
      const returnValue = await this.siomeApi.addChild("ns=2;i=1001", params)

    }

  }

}
