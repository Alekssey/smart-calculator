class SmartCalculator {
    constructor(initialValue) {
        // your implementation
        this.initialValue = initialValue;
        this.array_act = [];
        this.array = [this.initialValue];
        this.array_reserve;
    }

    add(number) {
        // your implementation
        if(this.array_act.length == 0){
            this.array_act.push('+');
            this.array.push(number);
        } else {
            if(this.array_act[this.array_act.length - 1] == '-' || this.array_act[this.array_act.length - 1] == '+'){
                this.array.push(this.array_act[this.array_act.length - 1]);
                this.array.push(number);
                this.array_act.splice(this.array_act.length - 1,1,'+');
            } else if( this.array_act[this.array_act.length - 1] == '*' || this.array_act[this.array_act.length - 1] == '/' || this.array_act[this.array_act.length - 1] == '^' ){
                this.array.push(this.array_act[this.array_act.length - 1]);
                this.array_act.splice(this.array_act.length - 1,1);
                if(this.array_act.length == 0){
                    this.array.push(number);
                    this.array_act.push('+');
                } else if(this.array_act.length == 1){
                    this.array.push(this.array_act[this.array_act.length - 1]);
                    this.array.push(number);
                    this.array_act.splice(this.array_act.length - 1,1,'+');
                }
            }
        }


        this.valueOf();
        return this;

    }

    subtract(number) {
        // your implementation
        if(this.array_act.length == 0){
            this.array_act.push('-');
            this.array.push(number);
        } else {
            if(this.array_act[this.array_act.length - 1] == '-' || this.array_act[this.array_act.length - 1] == '+'){
                this.array.push(this.array_act[this.array_act.length - 1]);
                this.array.push(number);
                this.array_act.splice(this.array_act.length - 1,1,'-');
            } else if( this.array_act[this.array_act.length - 1] == '*' || this.array_act[this.array_act.length - 1] == '/' || this.array_act[this.array_act.length - 1] == '^' ){
                this.array.push(this.array_act[this.array_act.length - 1]);
                this.array_act.splice(this.array_act.length - 1,1);
                if(this.array_act.length == 0){
                    this.array.push(number);
                    this.array_act.push('-');
                } else if(this.array_act.length == 1){
                    this.array.push(this.array_act[this.array_act.length - 1]);
                    this.array.push(number);
                    this.array_act.splice(this.array_act.length - 1,1,'-');
                }
            }
        }


        this.valueOf();
        return this;
    }

    multiply(number) {
        // your implementation
        if(this.array_act.length == 0){
            this.array_act.push('*');
            this.array.push(number);
        } else {
            if(this.array_act[this.array_act.length - 1] == '^' || this.array_act[this.array_act.length - 1] == '/' || this.array_act[this.array_act.length - 1] == '*'){
                this.array.push(this.array_act[this.array_act.length - 1]);
                this.array.push(number);
                this.array_act.splice(this.array_act.length - 1,1,'*');
            } else if(this.array_act[this.array_act.length - 1] == '+' || this.array_act[this.array_act.length - 1] == '-'){
                this.array.push(number);
                this.array_act.push('*');
            }
        }


        this.valueOf();
        return this;
    }

    devide(number) {
        // your implementation
        if(this.array_act.length == 0){
            this.array_act.push('/');
            this.array.push(number);
        } else {
            if(this.array_act[this.array_act.length - 1] == '^' || this.array_act[this.array_act.length - 1] == '/' || this.array_act[this.array_act.length - 1] == '*'){
                this.array.push(this.array_act[this.array_act.length - 1]);
                this.array.push(number);
                this.array_act.splice(this.array_act.length - 1,1,'/');
            } else if(this.array_act[this.array_act.length - 1] == '+' || this.array_act[this.array_act.length - 1] == '-'){
                this.array.push(number);
                this.array_act.push('/');
            }
        }


        this.valueOf();
        return this;
    }

    pow(number) {
        // your implementation
        if(this.array_act.length == 0){
            this.array_act.push('^');
            this.array.push(number);
        } else {
            this.array.push(number);
            this.array.push('^');
        }

        this.valueOf();
        return this;
    }

    valueOf(){

        this.array_reserve = this.array.slice(0,this.array.length);
        for(let i = this.array_act.length - 1; i >= 0; i--){
            this.array_reserve.push(this.array_act[i]);
        }
        let res;
        let res_act;
        let res_one;
        let res_two;
        while(this.array_reserve.length != 1){
            for(let i = this.array_reserve.length - 1; i >= 0; i--){
                if(this.array_reserve[i] == '^' && this.array_reserve[i-2] == '^'){
                    res = Math.pow(this.array_reserve[i-3],this.array_reserve[i-1]);
                    this.array_reserve.splice(i-3,1,res);
                    this.array_reserve.splice(i-1,2);
                }
            }
            for(let i = 0; i < this.array_reserve.length; i++){
                res_act = this.array_reserve[i];
                res_one = this.array_reserve[i-2];
                res_two = this.array_reserve[i-1];
                if(res_act == '+'){
                    res = res_one+res_two;
                    this.array_reserve.splice(i-2,3,res);
                    i = -1;
                } else if(res_act == '-'){
                    res = res_one-res_two;
                    this.array_reserve.splice(i-2,3,res);
                    i = -1;
                } else if(res_act == '*'){
                    res = res_one*res_two;
                    this.array_reserve.splice(i-2,3,res);
                    i = -1;
                } else if(res_act == '/'){
                    res = res_one/res_two;
                    this.array_reserve.splice(i-2,3,res);
                    i = -1;
                } else if(res_act == '^'){
                    res = Math.pow(res_one,res_two);
                    this.array_reserve.splice(i-2,3,res);
                    i = -1;
                }
            }
        }
        this.initialValue = this.array_reserve[0];
        return this.initialValue.toString();
    }


}

module.exports = SmartCalculator;




