$(function(){
    // var arr;
    $.ajax({
        url:"./goods.json",
        type: 'get',
        dataType: 'json',
        success: function (jsonArr){
            $.each(jsonArr,function (index,item){
                var goodsDom = `<div class="item">
                                    <img src="${item.imgUrl}" alt="">
                                    <h3><span>￥</span>${item.price}</h3>
                                    <p>${item.title}</p>
                                    <i><span>${item.evaluate}</span>条评价</i>
                                    <h4>${item.store}</h4>
                                    <div class="add" data-id="${item.id}">加入购物车</div>
                                </div>`;
                $('.wrap').append(goodsDom);
                // arr = jsonArr;
            })
        }
    })

    $(".wrap").on("click",".add",function(){
        var goodsArr = [];
        if (localStorage.getItem('goods')) {
            goodsArr = JSON.parse(localStorage.getItem('goods'));
        }
        // 当前商品的编码
        var id = $(this).attr('data-id');
        // console.log(code)
        // 标记是否已经加入过购物车
        var flag = false;
        $.each(goodsArr,function (index,item){
            if (item.id === id) {
                item.num++;
                flag = true;
                return false;
            }
        })
        // 购物车没有此商品，push {id: 'abc1',num: 1}
        if (!flag) {
            goodsArr.push({"id": id,"num": 1});
        }
        // console.log(goodsArr)
        // 数据存储到 localStorage中
        localStorage.setItem('goods',JSON.stringify(goodsArr));
        alert('加入购物车成功！');
    })
    
})