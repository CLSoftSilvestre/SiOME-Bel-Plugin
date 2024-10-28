import { Pipe, PipeTransform } from '@angular/core';

import { SiomeApiProviderService } from '../services/siome-api-provider.service';
import { ISiomeApi } from '../shared/public-api/interfaces/siome-api.interface';
import { NodeClass } from '../shared/public-api/enums/node-classes';


@Pipe({
  name: 'class'
})
export class ClassPipe implements PipeTransform {

  constructor (private siomeApiProvider: SiomeApiProviderService) {
  }

  private get siomeApi(): ISiomeApi {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.siomeApiProvider.siomeApi!;
  }

  async transform(namespace: any, value: any) {
    let nodeId = "ns="+String(namespace)+";i="+String(value);
    value = (await this.siomeApi.getOpcNode(nodeId)).nodeClass;

    switch (value) {
      case NodeClass.Object:
        return "🧩";
        break;
      case NodeClass.Variable:
        return "🏷️";
        break;
      case NodeClass.Method:
        return "⚡";
        break;
      default:
        return "🗂️";
        break;
    }

  }

}
