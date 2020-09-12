import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatoComponent } from './gato.component';
import { Celda } from '../Modelo/Celda';
describe('GatoComponent', () => {
  let component: GatoComponent;
  let fixture: ComponentFixture<GatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('debe regresar un false minetras haya celdas disponibles', () => {
    const gato = new GatoComponent();
    gato.InicializaTablero();
    const resultado = gato.hayCeldasDisponibles();
    
    expect(resultado).toBeFalsy()
  });
  it('debe regresar un false minetras haya celdas disponibles', () => {
    const gato = new GatoComponent();
    gato.InicializaTablero();
    const resultado = gato.esGanador("X")
    
    expect(resultado).toBeFalsy()
  });
  it('Debe regresar un true si el jugador lleno 3 horizonatles primera fila. ', () => {
    const gato = new GatoComponent();
    gato.InicializaTablero();
    let turno: string;
    turno = "X";
    let point0=new Celda(0,0,turno);
    let point1=new Celda(0,1,turno);
    let point2=new Celda(0,2,turno);
    
    gato.move( point0, turno)
    gato.move( point1, turno)
    gato.move( point2, turno)
    const resultado = gato.esGanador("X")
    
    expect(resultado).toBeTruthy()
  });
  it('Debe regresar un true si el jugador lleno 3 diagonales primera fila. ', () => {
    const gato = new GatoComponent();
    gato.InicializaTablero();
    let turno: string;
    turno = "X";
    let point0=new Celda(0,0,turno);
    let point1=new Celda(1,1,turno);
    let point2=new Celda(2,2,turno);
    
    gato.move( point0, turno)
    gato.move( point1, turno)
    gato.move( point2, turno)
    const resultado = gato.esGanador("X")
    
    expect(resultado).toBeTruthy()
  })
});
