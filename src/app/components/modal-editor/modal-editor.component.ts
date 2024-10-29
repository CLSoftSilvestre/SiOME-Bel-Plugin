import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SiomeApiProviderService } from '../../services/siome-api-provider.service';
import { ISiomeApi } from '../../shared/public-api/interfaces/siome-api.interface';


@Component({
  selector: 'app-modal-editor',
  templateUrl: './modal-editor.component.html',
  styleUrl: './modal-editor.component.css'
})
export class ModalEditorComponent implements OnInit {

  constructor (private siomeApiProvider: SiomeApiProviderService, public dialogRef: MatDialogRef<ModalEditorComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
