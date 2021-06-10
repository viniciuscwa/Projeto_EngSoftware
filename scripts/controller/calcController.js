class calcController{

    constructor(){

        this._ultNum = "";
        this._ultOp = "";
        this._newobj = [];
        this._ps = false;
        this._displayCalcEl = document.querySelector("#display");
        this.btnCont();

    }

    btnCont(){

        let btn = document.querySelectorAll(".row > button");
        btn.forEach(but => {

            this.addEventListenerAll(but,"click draggin", e => {

                this.getText(but.innerHTML);

            });

        });

    }
    setLastNumberToDisplay(){

        let ultNum = this.getLast(false);
        if(!ultNum || this.isOperator(this.getLastItem()))ultNum = 0;
        this.DisplayCalc = ultNum;

    }

    CleanAll(){

        this._algnum = [];
        this.setLastNumberToDisplay();

    }
    cleanLastEntry(){

        if(!this.isOperator(this.getLastItem()))this._algnum.pop();
        this.setLastNumberToDisplay();

    }

    calcSqrtPowD(txt){

        if(!this._ps)this._ps = true;
        let res;
        let ultNum = (this.DisplayCalc != 0 && this.isOperator(this.getLastItem())) ? this.getLast(false) : this.getLastItem();
        if(txt == "√"){

            res = (isNaN(lastNumb)) ? Math.sqrt("0") : Math.sqrt(lastNumb);

        }
        if(txt == "x²"){

            res = (isNaN(lastNumb)) ? Math.pow("0",2) : Math.pow(lastNumb,2);

        }
        if(txt == "¹/x"){

            res = (isNaN(lastNumb)) ? 0 : 1/lastNumb;

        }
        if(isNaN(this.getLastItem())){

            this.addItmArray(res);

        }
        else{

            this.changeLastItem(res);

        }
        this.setLastNumberToDisplay();

    }

    getText(text){

        switch(text){

            case "CE":
                this.cleanLastEntry();
            break;
            case "C":
                this.CleanAll();
            break;
            case "√":
                this.calcSqrtPowD("√");
            break;
            case "x²":
                this.calcSqrtPowD("x²");
            break;
            case "¹/x":
                this.calcSqrtPowD("¹/x");
            break;
            case "÷":
                this.checkItem("/");
            break;
            case "X":
                this.checkItem("*");
            break;
            case "%":
                this.calcentryP();
            break;
            case "-":
            case "+":
                this.checkItem(text);
            break;
            case "=":
				this.CalcRes();
            break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.checkItem(text);
            break;
            case "←":
                this.backSpace();
            break;
            case ",":
                this.addPoint();
            break;
            case "±":
                this.cglastNmb();
            break;

        }

    }
	
	resEval(){
		try{
			return eval(this._algnum.join(" "));
		}
		catch(e){
			
			console.log(e);
			
		}
	}

	CalcRes(){
		
		let lastop;
		this._lastOper = this.getLast();
		if(this._algnum.length > 3){
			
			lastop = this._algnum.pop();
			this._lastNumber = this._algnum.pop();
			
        }
        
		let res = this.resEval();
		
		this._algnum = (isNaN(lastop)) ? [res,lastop] : [res];
		
		if(!this._ps) this._ps = true;
		this.setLastNumberToDisplay();
		
	}

    addPoint(){

        let lastOper = this.getLastItem();
        if(typeof lastOper === "string" && lastOper.split("").indexOf(".") > -1) return;
        if(this.isOperator(lastOper) || (!lastOper && lastOper != "0") || this._ps == true){

            if(this._ps){

                this._ps = false;
                this.changeLastItem("0.");

            }else{

                this.addItmArray("0.");

            }

        }
        else{

            this.changeLastItem(lastOper.toString() + ".");

        }
        this.setLastNumberToDisplay();

    }

    calcentryP(){

        if(this.DisplayCalc != 0 && this.isOperator(this.getLastItem())){

            this.addItmArray(this.getLast(false));

        }
        this._ps = true;
        let prt;
        switch(this._algnum.length){

            case 1:
                prt = (this._lastNumber != "" && (this._lastOper == "*" || this._lastOper == "/")) ? this.getLastItem() / 100 : 0 * this.getLastItem() / 100 ;
                this.changeLastItem(prt);
            break;
            case 2:
                this.addItmArray(0);
            break;
            case 3:
                prt = (this.getLast() == "*" || this.getLast() == "/") ? this.getLastItem() / 100 : this._algnum[0] * this.getLastItem() / 100;
                this.changeLastItem(prt);
            break;

        }
        this.setLastNumberToDisplay();

    }

    backSpace(){

        if(!isNaN(this.getLastItem())){

            let rt;
            if(!this.getLastItem() == "0"){

                rt = this.getLastItem().toString().split("");
                if(!this._ps)rt.pop();
                this.changeLastItem(rt.join(""));

            }
            
        }
        this.setLastNumberToDisplay();

    }

    cglastNmb(){

        if(this.DisplayCalc != 0 && this.isOperator(this.getLastItem())){

            this.addItmArray(this.getLast(false));
            this._ps = true;

        }
        if(!isNaN(this.getLastItem())){
            let lastItem = this.getLastItem();
            if(parseFloat(lastItem)>0){
                this.changeLastItem("-" + lastItem.toString());
            }
            else{
                this.changeLastItem(lastItem.toString().replace("-",""));
            }
            this.setLastNumberToDisplay();
        }

    }

    isOperator(itm){

        return ['*','-','/','+','%'].indexOf(itm) > -1;

    }

    addItmArray(itm){

        this._algnum.push(itm.toString());

    }

    checkItem(itm){

        if(isNaN(this.getLastItem())){

            if(this.isOperator(itm)){

                if(this._algnum.length > 0){

                    this.changeLastItem(itm);

                }

            }
            else{

                this.addItmArray(itm);
                this.setLastNumberToDisplay();

            }


        }
        else{

            if(this.isOperator(itm)){

                if(this._ps) this._ps = false;
                this.addItmArray(itm);
				if(this._algnum.length > 3){
					
					this.CalcRes();
					
				}

            }else{

                let rt = this.getLastItem();
                let ayrt = rt.toString().split("");
                if(ayrt.length == 1 && ayrt[0] == "0" && itm == "0")return;
                else if((ayrt.length == 1 && ayrt[0] == "0") || this._ps){
					
					if(this._ps)this._ps = false;
                    this.changeLastItem(itm);

                }
                else{

                    this.changeLastItem(rt.toString() + itm.toString());

                }
                if(this._ps)this._ps = false;
                this.setLastNumberToDisplay();

            }

        }

    }

    changeLastItem(itm){

        this._algnum[this._algnum.length - 1] = itm;

    }

    getLastItem(){

        return this._algnum[this._algnum.length - 1];

    }

    getLast(operator = true){

        let lastItem;
        for(let i = this._algnum.length-1; i >= 0; i--){

            if(this.isOperator(this._algnum[i]) == operator){

                lastItem = this._algnum[i];
                break;

            }

        }
        if(!lastItem){

            lastItem = (operator) ? this._lastOper : this._lastNumber ;

        }
        return lastItem;

    }

    addEventListenerAll(elment,events,fn){

        events.split(" ").forEach(evt => {

            elment.addEventListener(evt,fn);

        });

    }

    set DisplayCalc(value){

        this._displayCalcEl.innerHTML = value;

    }
    get DisplayCalc(){

        return this._displayCalcEl.innerHTML;

    }

}
