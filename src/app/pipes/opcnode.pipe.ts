import { Pipe, PipeTransform } from '@angular/core';

import { SiomeApiProviderService } from '../services/siome-api-provider.service';
import { ISiomeApi } from '../shared/public-api/interfaces/siome-api.interface';

@Pipe({
  name: 'opcnode'
})
export class OpcnodePipe implements PipeTransform {

  constructor (private siomeApiProvider: SiomeApiProviderService) {
  }

  private get siomeApi(): ISiomeApi {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.siomeApiProvider.siomeApi!;
  }

  async transform(namespace: any, value: any) {
    let nodeId = "ns="+String(namespace)+";i="+String(value);
    return await this.siomeApi.getOpcNode(nodeId);
  }

}
