import { Component, Inject, OnInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SiomeApiProviderService } from '../../services/siome-api-provider.service';
import { ISiomeApi } from '../../shared/public-api/interfaces/siome-api.interface';
import { NodeClass } from 'src/app/shared/public-api/enums/node-classes';
import { IAddObjectParameter } from 'src/app/shared/public-api/interfaces/add-object-parameter';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrl: './modal-details.component.css'
})
export class ModalDetailsComponent implements OnInit {

  constructor (private siomeApiProvider: SiomeApiProviderService, public dialogRef: MatDialogRef<ModalDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  private get siomeApi(): ISiomeApi {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.siomeApiProvider.siomeApi!;
  }


  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}