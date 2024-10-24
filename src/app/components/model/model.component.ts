import { Component, Input } from '@angular/core';
import { SiomeApiProviderService } from '../../services/siome-api-provider.service';
import { ISiomeApi } from '../../shared/public-api/interfaces/siome-api.interface';

import { NodeClass } from 'src/app/shared/public-api/enums/node-classes';
import { IAddObjectParameter } from 'src/app/shared/public-api/interfaces/add-object-parameter';

import { ModelInterface } from 'src/app/types/model.interface';

import { MatDialog } from '@angular/material/dialog';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { ModalDetailsComponent } from '../modal-details/modal-details.component';
import { INodeId } from 'src/app/shared/public-api/opcua-types/interfaces/node-id.interface';
import { IOpcNode } from 'src/app/shared/public-api/interfaces/opc-node.interface';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrl: './model.component.css',
})
export class ModelComponent {

  @Input() model!: ModelInterface;

  constructor(private siomeApiProvider: SiomeApiProviderService, public dialog: MatDialog) {}

  private get siomeApi(): ISiomeApi {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.siomeApiProvider.siomeApi!;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalFormComponent, {
      width: '300px', //was 250
      data: {
        model: this.model
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  async openDetails() {

    // Read model properties
    const opcNode = await this.siomeApi.getOpcNode(this.model.id);
    let childs:IOpcNode[] = []

    for (let i= 0; i< opcNode.children.length; i++){
      childs.push(await this.siomeApi.getOpcNode("ns=" + opcNode.children[i].namespace.toString() + ";i="+ opcNode.children[i].value.toString()));
    }
    
    const dialogRef = this.dialog.open(ModalDetailsComponent, {
      width: '680px', //was 250
      data: {
        model: this.model,
        node: opcNode,
        childs: childs,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  //your code :
  async instantiateModel() {
    this.siomeApi.openAlertDialog(
      'Bel Plugin!',
      'This will add one instance of the model ' + this.model.name + ' to OPC-UA Server.',
    );
    await this.siomeApi.createLogNode("Bel Plugin");
    await this.siomeApi.newLogEntry("Instantiating the model " + this.model.name + " into server objects.", "info");
    await this.siomeApi.newLogEntry("This method is not implemented yet! Who knows it be avaiable soon?! :)", "error");
  }

}
