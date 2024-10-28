import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PluginEventType } from './shared/public-api/enums/plugin-event-type';
import { ISiomeApi } from './shared/public-api/interfaces/siome-api.interface';
import { IPluginEvent } from './shared/public-api/plugin-interfaces/plugin-event.interface';
import { SiomeApiProviderService } from './services/siome-api-provider.service';
import { ModelsService } from './services/models.service';
import { ModelInterface } from './types/model.interface';
import { Observable } from 'rxjs';
import { SupportedFileFormat } from './shared/public-api/enums/supported-file-format';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SiOME Bel Plugin';
  models$!: Observable<ModelInterface[]>;

  //modelName:string = "Pasteurizer"
  //modelDescription:string = "A pasteurizer is a device that heats food and beverages to a specific temperature for a set period to kill harmful microorganisms, ensuring safety and extending shelf life."

  @Output() pluginEvent = new EventEmitter<IPluginEvent>();
  
  @Input()
  set isPluginCommunicationReady(isReady: boolean) {
    if (isReady) {
      const callback = (siomeApi: ISiomeApi): void => {
        this.siomeApiProvider.siomeApi = siomeApi;
      };
      this.pluginEvent.emit({
        eventType: PluginEventType.REQUEST_API,
        callback,
      });
    }
  }

  constructor(private siomeApiProvider: SiomeApiProviderService, private modelsService: ModelsService) {}

  ngOnInit() {
    this.models$ = this.modelsService.getModels();
  }
}
