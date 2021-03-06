import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Credit } from 'src/app/models/credit.model';
import { CreditsService } from 'src/app/services/credits.service';
import { SwalTool } from 'src/app/tools/swal.tool';

@Component({
  selector: 'app-modal-approve-credit',
  templateUrl: './modal-approve-credit.component.html',
  styleUrls: ['./modal-approve-credit.component.css']
})
export class ModalApproveCreditComponent implements OnInit {

  @Input() credit: Credit;
  public approveCreditForm: FormGroup;
  public loading = false;
  public filesToUpload: File[];

  constructor(public dialogRef: MatDialogRef<ModalApproveCreditComponent>,
              private fb: FormBuilder,
              private creditsService: CreditsService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.approveCreditForm = this.fb.group({
      files: ['', [Validators.required]],
      commentary: ['', [Validators.required]],
    });
  }

  getFormField(field: string): AbstractControl {
    return this.approveCreditForm.get(field);
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      this.approveCreditForm.patchValue({file: files});
      this.filesToUpload = files;
    }
  }

  approveCredit(): void {
    if (this.approveCreditForm.valid) {
      this.loading = true;
      const commentary = this.getFormField('commentary').value;
      this.creditsService.approveCredit(this.credit.id, commentary, this.filesToUpload)
      .subscribe(() => {
        this.loading = false;
        SwalTool.onMessage('Credito aprobado', `El credito fue aprobado correctamente`);
        this.dialogRef.close('YES');
      }, () => {
        this.loading = false;
        SwalTool.onError('Error', 'Error al aprobar el credito');
      });
    }
  }

}
