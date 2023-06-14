function LoadingWithMask() {
    //화면의 높이와 너비를 구합니다.
    let maskHeight = window.innerHeight;
    let maskWidth = window.innerWidth;

    //화면에 출력할 마스크를 설정해줍니다.
    let mask = `<div id='mask' style='position: fixed; z-index:1; background-color:#000000;
                left:0; top:0; width: 100%; height: 100%; opacity: 0.3;'></div>`

    let loadingImg = `<div id='loadingImg'>
                        <img src='./Img/LoadingImg.gif' style='position: absolute; z-index:2; top: 50%; left: 50%; transform: translate(-50%, -50%);'/>
                    </div>`

    //화면에 레이어 추가
    $('body')
        .append(mask)
        .append(loadingImg)

    //마스크 표시
    $('#mask').show();

    //로딩중 이미지 표시
    $('#loadingImg').show();
}

function closeLoadingWithMask() {
    $('#mask, #loadingImg').hide();
    $('#mask, #loadingImg').remove();
}