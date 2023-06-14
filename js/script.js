/* 대답창 숨기기 */
const responseContainer = document.querySelector('.response-container');
responseContainer.style.display = 'none';


/* submit 누르면 텍스트 검색창에 뜨게 하기*/
document.addEventListener('DOMContentLoaded', function () {
    // 모든 submit 버튼 선택
    const submitButtons = document.querySelectorAll('.submit-button input[type="submit"]');
    // 각 submit 버튼에 클릭 이벤트 리스너 추가
    submitButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // 기본 제출 동작 방지
            const value = this.value; // 버튼의 값

            const searchInput = document.querySelector('.search-input');
            searchInput.value = value; // 검색 입력란에 버튼의 값 설정
        });
    });
});


/* api 연동 */
let $input = document.querySelector('.search-input');
let $button = document.querySelector('.search-button');
let $responseContainer = document.querySelector('.response-container');
let $response = document.querySelector('.response-content');

let data = [
    {
        "role": "system",
        "content": "assistant는 음악을 추천해주는 DJ이다."
    },
    {
        "role": "system",
        "content": "user는 듣고 싶은 노래의 분위기, 현재 상태 등의 정보를 알려줄 것이다. 정보의 컨셉, 분위기, 상황에 맞는 노래를 추천해준다."
    },
    {
        "role": "system",
        "content": "노래는 10곡을 추천해준다."
    },
    {
        "role": "system",
        "content": `답변창에는 다음의 예시와 같은 양식만 보여준다.
        <예시>
        1. 곡 제목 - 가수 이름
        2. 곡 제목 - 가수 이름
        3. 곡 제목 - 가수 이름
        4. 곡 제목 - 가수 이름
        5. 곡 제목 - 가수 이름
        6. 곡 제목 - 가수 이름
        7. 곡 제목 - 가수 이름
        8. 곡 제목 - 가수 이름
        9. 곡 제목 - 가수 이름
        10. 곡 제목 - 가수 이름
        </예시>`
    }
];

let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

$button.addEventListener('click', e => {
    e.preventDefault();
    let userInputData = $input.value.trim();
    $input.value = '';

    if (userInputData === '') return;

    data.push({
        "role": "user",
        "content": `${userInputData} 분위기, 컨셉에 맞는 노래 10곡을 추천해줘.`
    });

    chatGptAPI();
});

function chatGptAPI() {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
    })
        .then(res => res.json())
        .then(res => {
            const answer = res.choices[0].message.content;

            $response.innerText = answer;
            $responseContainer.style.display = 'flex'; // 대답창 보이기
        })
        .catch(error => {
            console.error(error);
            $response.innerText = "오류가 발생했습니다. 다시 시도해주세요.";
            $responseContainer.style.display = 'flex'; // 대답창 보이기
        });
}