$(function() {
    // 滚动条
    resetui()
    // 为发送按钮绑定事件
    $("#btnSend").on("click",function() {
        var text=$("#ipt").val().trim();
        if(text.length<=0) {
            return $("#ipt").val('');
        }
        $("#talk_list").append('<li class="right_word"><img src="images/person02.png" /><span>'+text+'</span></li>');
        $("#ipt").val('');
        resetui();
        getMsg(text);
    })
    // 获取聊天机器人发送消息
    function getMsg(text) {
        $.ajax({
            get:'GET',
            url:"http://www.liulongbin.top:3006/api/robot",
            data:{
                spoken:text
            },
            success:function(res) {
               if(res.message ==='success') {
                   var msg=res.data.info.text$("#talk_list").append('<li class="left_word"><img scr="images/person01.peng" /><span>'+msg+'</span></li>');
                   resetui();
                   getVoice();
               }
            }
        })
    }

    // 把文字转为语音
    function getVoice(text) {
        $.ajax ({
            method:'GET',
            url:'http://www.liulongbin.top:3006/api/synthesize',
            data:{
                text:text,
            },
            success:function(res) {
                if(res.status ===200) {
                    $("#voice").attr("src",res.voiceUrl);
                }
            }
        })
    }

    $("#ipt").on("keyup",function(e) {
        if(e.keyCode===13) {
            $("#btnSend").click();
        }
    })
})