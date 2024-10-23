/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { SiomeApiProviderService } from '../../services/siome-api-provider.service';
import { ISiomeApi } from '../../shared/public-api/interfaces/siome-api.interface';

import { NodeClass } from 'src/app/shared/public-api/enums/node-classes';
import { IAddObjectParameter } from 'src/app/shared/public-api/interfaces/add-object-parameter';


@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css'],
})
export class HelloWorldComponent {
  constructor(private siomeApiProvider: SiomeApiProviderService) {}

  private get siomeApi(): ISiomeApi {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.siomeApiProvider.siomeApi!;
  }

  //your code :
  async helloWorld() {
    this.siomeApi.openAlertDialog(
      'Hello World!',
      'Hello World from my custom plugin',
    );
  }
  
  // Code to add logs
  async addLogs() {
    await this.siomeApi.createLogNode("example log node");
    await this.siomeApi.newLogEntry("This log message has the type info", "info");
    await this.siomeApi.newLogEntry("This log message has the type warning", "warning");
    await this.siomeApi.newLogEntry("This log message has the type error", "error");
  }

  // Code to add Node
  async addNode() {
    const params: IAddObjectParameter = {
      name: 'My Custom Node',
      nodeClass: NodeClass.Object,
      referenceType: 'ns=0;i=35',
      namespaceIndex: 1,
      typeDefinition: 'ns=0;i=58'
    }

    const namespaceArray = await this.siomeApi.getNamespaceArray()
    if(namespaceArray.includes("my-new-namespace") === false ) {
      await this.siomeApi.createNamespaceImplicit("my-new-namespace", "0.1")
    }
    
    const returnValue = await this.siomeApi.addChild("ns=0;i=85", params)
    
  }

}
