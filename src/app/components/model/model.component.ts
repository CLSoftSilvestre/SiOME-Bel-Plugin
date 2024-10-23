import { Component, Input } from '@angular/core';
import { SiomeApiProviderService } from '../../services/siome-api-provider.service';
import { ISiomeApi } from '../../shared/public-api/interfaces/siome-api.interface';

import { NodeClass } from 'src/app/shared/public-api/enums/node-classes';
import { IAddObjectParameter } from 'src/app/shared/public-api/interfaces/add-object-parameter';
import { ModelInterface } from 'src/app/types/model.interface';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrl: './model.component.css',
})
export class ModelComponent {

  @Input() model!: ModelInterface;

  constructor(private siomeApiProvider: SiomeApiProviderService) {}

  private get siomeApi(): ISiomeApi {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.siomeApiProvider.siomeApi!;
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
