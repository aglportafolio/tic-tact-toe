export class Celda {
  
    private x: number;
    private y: number;
    private ficha: string;
    private minimaxValue: number;
    
   
  constructor(x,y,ficha)
  {
this.x=x;
this.y=y;
this.ficha=ficha;

  }
  public getFicha():String{
  	return this.ficha;

  }
  public setFicha(fichaSet:string){
  	 this.ficha=fichaSet;

  }
  public getToString():String{
  	 var a:number;
  	 a=5;
  	return   "ficha:["+this.ficha+"] x:["+this.x+"] y:["+this.y +"]"+"minimaxValue["+this.minimaxValue+"]";
  }
  public getCeldasDisponiblesTamano():number{
  	
  	return 0;
  }
  public setMinimaxValue(fichaSet:number){
  	 this.minimaxValue=fichaSet;

  }
  public getX():number{
  	return this.x;
  }
    public getY():number{
  	return this.y;
  }
  public getMinimaxValue():number{
  	 return this.minimaxValue;

  }
}