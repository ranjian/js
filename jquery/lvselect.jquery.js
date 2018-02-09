/**
 * extends jquery
 * @author by
 */

jQuery.lvselect = function(para) {
    var defaults = {
        type:"val",
        ele:["#select1","#select2"],
        data:{"0":[{"val":"1","parent":"0","txt":"txt1"}],"1":[{"val":"2","parent":"1","txt":"txt2"},{"val":"21","parent":"1","txt":"txt21"}]},
        selected:[],
        tip:[],
        match:{"val":"val","txt":"txt","parent":"parent","id":"id"}
    };
    var para = $.extend(defaults, para);
    var lv = para.ele.length;

    $.each(para.ele,function (i,e) {
        para.tip[i] = $(para.ele[i]).html();
    })
    $(para.ele[0]).html(create_opt(para.data[0],0));
    $.each(para.ele,function (i,e) {
        $(e).change(function () {
            if(i<(lv-1)){
                var val = $(this).val();
                if(para.type == "txt"){
                    if(i == 0){
                        val = get_key(para.data[0],val);
                    }else{
                        val = get_key(para.data[$(para.ele[i-1]).data("val")],val);
                    }
                    $(this).data("val",val);
                }
                $(para.ele[i+1]).html(create_opt(para.data[val],i+1));
                for (var j=i+2; j<lv ; j++){
                    if($(para.ele[j-1]).val() == para.selected[j-1]){
                        $(para.ele[j]).html(create_opt(para.data[$(para.ele[j-1]).val()],j));
                    }else{
                        $(para.ele[j]).html(para.tip[j]);
                    }
                }
            }
        })
        $(e).change();
    })

    function create_opt(data,i) {
        if(data == undefined){
            html = para.tip[i];
            return html;
        }
        var html;
        if(para.tip[i] != undefined){
            html = para.tip[i];
        }else{
            html = $(para.ele[i]).html();
        }
        $.each(data,function (j,e) {
            var selected = "";
            if(e[para.match.val] == para.selected[i]){
                selected = " selected";
            }
            html +='<option value="'+e[para.match.val]+'"'+selected+'>'+e[para.match.txt]+'</option>';
        })
        return html;
    }
    
    function get_key(data,txt) {
        var rs;
        if(data == undefined){
            return false;
        }
        $.each(data,function (i,e) {
            if(e[para.match.txt] == txt){
                rs = e[para.match.id];
                return false;
            }
        })
        return rs;
    }
}