
var getFaces = function () {
    $('#canvas').faceDetection({
        complete: function (faces) {
            if (faces.length == 0) { //说明没有检测到人脸
                console.log("无人脸")
            } else {
                for (var i in faces) {
                    console.log(faces[i]);
                    // draw(faces[i].x, faces[i].y, faces[i].width, faces[i].height);
                }
            }
        },
        error: function (code, message) {
            console.log("complete回调函数出错")
        }
    });
};
getFaces();
