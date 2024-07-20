import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { API, Registry } from '../registry-interface';
import { RegistryService } from '../registry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss'],
})
export class RegistryComponent {
  registry!: FormGroup;
  userCEP: API = {
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
    ibge: '',
    gia: '',
    ddd: '',
    siafi: '',
  };

  userInfo: Registry[] = [];
  addressDiv: boolean = false;
  districtExists: boolean = false;
  addressExists: boolean = false;

  constructor(
    private service: RegistryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  validateCEP() {
    if (this.registry.get('cep')?.valid) {
      this.service.list(this.registry.get('cep')?.value).subscribe((res) => {
        this.userCEP = res;
        this.registry.patchValue({
          // Útil para salvar informações da API como dados. Lembre-se disso ou o console.log iria sair com uns dados vazios!
          state: res.uf,
          city: res.localidade,
          district: res.bairro,
          address: res.logradouro,
        })
        this.enableFormControls();
        // console.log(this.userCEP);
      });
      this.addressDiv = true;
    }
  }

  enableFormControls() {
    this.registry.get('state')?.value == '' ? this.registry.controls['state']?.enable() : this.registry.controls['state']?.disable();
    this.registry.get('city')?.value == '' ? this.registry.get('city')?.enable() : this.registry.get('city')?.disable();
    this.registry.get('district')?.value == '' ? this.registry.get('district')?.enable() : this.registry.get('district')?.disable();
    this.registry.get('address')?.value == '' ? this.registry.get('address')?.enable() : this.registry.get('address')?.disable();
    const form = this.registry.getRawValue();
    console.log("form", form);
  }

  register() {
    const form = this.registry.getRawValue();
    if (this.registry.valid) {
      this.userInfo.push(form);
      this.service.setInStorage('user', this.userInfo);
      console.log(this.userInfo);
      this.router.navigate(['/UserArea']);
    } else alert('Alguma informação está incorreta. Verifique.');
  }

  ngOnInit(): void {
    this.registry = this.formBuilder.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
          Validators.minLength(3),
        ]),
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/\w{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/),
        ]),
      ],
      cpf: ['', [Validators.required]],
      birthday: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      phone: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      state: [''],
      city: [''],
      district: new FormControl({ disabled: true }),
      address: [''],
      addressNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\d{1,4}/),
        ]),
      ],
    });
  }
}
