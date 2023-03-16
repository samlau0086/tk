function View(includes, excludes){
    this.includes = includes?includes:[];//必须出现的元素(字符串数组)
    this.excludes = excludes?excludes:[];//不能出现的元素(字符串数组)
    this.is_active = function(){
        for(i in this.includes){
            if(!eval(this.includes[i]).exists()){
                return false;
            }
        }
        for(i in this.excludes){
            if(eval(this.excludes[i]).exists()){
                return false;
            }
        }
        return true;
    }
}
module.exports = View;