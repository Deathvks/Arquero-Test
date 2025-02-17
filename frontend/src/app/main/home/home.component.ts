import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../servicios/http/http.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public formularioEmpleado: FormGroup;
  public datosTabla = [];
  public mostrarFormularioAnadirEmpleado: boolean;
  public mostrarFormularioEditarEmpleado: boolean;
  public empleadoSeleccionado: any = null;
  public mostrarMensajeErrorGeneral: boolean = false;
  public mostrarMensajeErrorDNI: boolean = false;

  constructor(private http: HttpService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.inicializarFormulario(null);
    this.getEmpleados();
  }

  // Método para inicializar el formulario Empleados
  private inicializarFormulario(empleado: any) {
    this.formularioEmpleado = this.formBuilder.group({
      id: new FormControl(empleado !== null ? empleado.id : ""),
      nombre: new FormControl(
        empleado !== null ? empleado.nombre : "",
        Validators.required
      ),
      apellido1: new FormControl(
        empleado !== null ? empleado.apellido1 : "",
        Validators.required
      ),
      apellido2: new FormControl(
        empleado !== null ? empleado.apellido2 : "",
        Validators.required
      ),
      dni: new FormControl(
        empleado !== null ? empleado.dni : "",
        Validators.required
      ),
      domicilio: new FormControl(
        empleado !== null ? empleado.domicilio : "",
        Validators.required
      ),
    });

    this.mostrarMensajeErrorGeneral = false;
    this.mostrarMensajeErrorDNI = false;

    this.formularioEmpleado
      .get("dni")
      .valueChanges.subscribe(() => this.validarDNI());
  }

  private getEmpleados() {
    this.http.get("/empleados").subscribe(
      (data) => {
        this.datosTabla = data;
      },
      (error) => console.log(error)
    );
  }

  public anadirEmpleado() {
    this.formularioEmpleado.markAllAsTouched();
    this.validarDNI();

    if (
      this.formularioEmpleado.get("dni").invalid &&
      this.formularioEmpleado.valid
    ) {
      this.mostrarMensajeErrorDNI = true;
      this.mostrarMensajeErrorGeneral = false;
    } else if (this.formularioEmpleado.invalid) {
      this.mostrarMensajeErrorGeneral = true;
      this.mostrarMensajeErrorDNI = false;
      console.log("Formulario inválido. No se añade el empleado.");
      return;
    } else {
      this.mostrarMensajeErrorGeneral = false;
      this.mostrarMensajeErrorDNI = false;
    }

    this.mostrarMensajeErrorGeneral = false;
    console.log("Añadir empleado");
    this.http.post("/empleados", this.formularioEmpleado.value).subscribe(
      (data) => {
        console.log("Empleado añadido");
        this.getEmpleados();
        this.mostrarFormularioAnadirEmpleado = false;
        this.inicializarFormulario(null);
      },
      (error) => console.log("No se ha podido añadir al empleado")
    );
  }

  public eliminarEmpleado(empleado: any) {
    console.log("Eliminar empleado");
    this.http.delete("/empleados/" + empleado.id).subscribe(
      (data) => {
        console.log("Empleado eliminado");
        this.getEmpleados();
      },
      (error) => console.log("No se ha podido eliminar el empleado")
    );
  }

  public editarEmpleado(empleado: any) {
    this.formularioEmpleado.markAllAsTouched();

    if (
      this.formularioEmpleado.get("dni").invalid &&
      this.formularioEmpleado.valid
    ) {
      this.mostrarMensajeErrorDNI = true;
      this.mostrarMensajeErrorGeneral = false;
    } else if (this.formularioEmpleado.invalid) {
      this.mostrarMensajeErrorGeneral = true;
      this.mostrarMensajeErrorDNI = false;
      console.log("Formulario inválido. No se edita al empleado.");
      return;
    } else {
      this.mostrarMensajeErrorGeneral = false;
      this.mostrarMensajeErrorDNI = false;
    }

    this.mostrarMensajeErrorGeneral = false;
    console.log("Editar empleado");
    this.http
      .put("/empleados/" + empleado.id, this.formularioEmpleado.value)
      .subscribe(
        (data) => {
          console.log("Empleado editado", data);
          this.getEmpleados();
          this.mostrarFormularioEditarEmpleado = false;
          this.inicializarFormulario(null);
        },
        (error) => console.log("No se ha podido editar al empleado")
      );
  }

  public validarDNI() {
    const dniControl = this.formularioEmpleado.get("dni");
    if (!dniControl) return;

    const dni = dniControl.value;

    if (!dni && !dniControl.touched) {
      dniControl.setErrors(null);
      this.mostrarMensajeErrorDNI = false;
      return;
    }
    if (
      this.formularioEmpleado.get("dni").hasError("required") &&
      dniControl.touched
    ) {
      dniControl.setErrors({ required: true });
      this.mostrarMensajeErrorDNI = false;
      return;
    }

    const dniRegex = /^[0-9]{8}[A-Z]$/;
    if (!dniRegex.test(dni)) {
      dniControl.setErrors({ dniInvalido: "El formato del DNI no es válido" });
      this.mostrarMensajeErrorDNI = true;
      return;
    }

    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    const numeros = dni.slice(0, 8);
    const letra = dni.slice(-1);
    const letraCalculada = letras[parseInt(numeros, 10) % 23];

    if (letra !== letraCalculada) {
      dniControl.setErrors({ dniInvalido: "La letra del DNI es incorrecta" });
      this.mostrarMensajeErrorDNI = true;
      return;
    }

    dniControl.setErrors(null);
    return true;
  }

  public cargarFormularioAnadirEmpleado() {
    this.inicializarFormulario(null);
    this.mostrarMensajeErrorGeneral = false;
    this.mostrarFormularioAnadirEmpleado = true;
    this.mostrarFormularioEditarEmpleado = false;
  }

  public cargarFormularioEditarEmpleado(empleado: any) {
    this.inicializarFormulario(empleado);
    this.empleadoSeleccionado = empleado;
    this.mostrarMensajeErrorGeneral = false;
    this.mostrarFormularioEditarEmpleado = true;
    this.mostrarFormularioAnadirEmpleado = false;
    console.log(empleado);
  }

  public refrescarTablaEmpleados() {
    console.log("Refrescar tabla empleados");
    this.getEmpleados();
  }
}
