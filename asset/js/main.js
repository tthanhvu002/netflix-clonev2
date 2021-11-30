// Api key :bec721bcb126b9938b6c2f7b39448c63

//path : https://api.themoviedb.org/3/movie/550?api_key=bec721bcb126b9938b6c2f7b39448c63
// https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
const api_key='api_key=bec721bcb126b9938b6c2f7b39448c63';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL+ '/discover/movie?sort_by=popularity.desc&' +api_key;
const Trending_URL_week = BASE_URL +'/trending/tv/week?' +api_key; //api cua trending film
const Trending_URL_day = BASE_URL +'/trending/tv/week?' +api_key;
const List_geners=BASE_URL+'/genre/movie/list?'+api_key;
const Tv_URL=BASE_URL+'/discover/tv?sort_by=popularity.desc&'+api_key;
const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);
const List_trending=$('.section-trending-list');
const Slide_item=$('.slider-item');
const genre_list=$('.geners_movie');
const Movie_Geners=$('.gener-tag-list');
const TV_section=$('.TV-show-list')
const PrevBtn=$('.prevbtn');
const NextBtn=$('.nextbtn');
const NumCur=$('.num-current');
const SearchBtn=$('.search-btn');
const Close_Modal=$('.close-js-btn');
const Search=$('.search-btn input');
const Login_btn=$('.login-btn');
const ModalTag=$('.modal');
const Header_navigate=$('.header-navigate-btn');
const Headeritem=$('.header-navigate');
console.log(Search)
// console.log(Bodytag)
let MaxPage=50;
let currentpage=1;
let IdCur=28;
let idxSlide=0;
let ValidHeight=(window.outerHeight*20)/100;
GetMovie();
GetTrending(Trending_URL_week,List_trending)
GetlistGenres(List_geners,genre_list);
GetTvShow(Tv_URL,TV_section)
ControlPage();
SearchTag();
SearchFeature();
Modal();

NavigateonMobile();
/* FormHandle();  */
FooterItem();
AnimateHeader();
function AnimateHeader(){
    
    // if(){

    // }
}
var i =1;
setInterval(function(){
    if(i<SliderArr.length) i++;
    else i=0;
    SlideHandle(i);
    
},10000);
function SlideHandle(i){
    let item=SliderArr[i];
    
    let html=`
    <div id="${item.id}" class="slider-item l-12  item-1" style="background-image: url(https://image.tmdb.org/t/p/original${item.backdrop_path});">
        <div class="slider-item-contend">
            <div class="slider-item-movie-name">${item.original_title}</div>
            <div class="slider-item-movie-overview">${item.overview}</div>
            <div class="slider-item-option">
                <div class="slider-item-btn">
                    <i class="fas fa-play"></i>
                    Play Now!
                </div>
                <div class="slider-item-btn">
                    <i class="fas fa-plus"></i>
                    Add To Wish list.
                </div>
            </div>
        </div>
    </div>
    `;
    $('.introduce').innerHTML=html;
    $('.slider-item .slider-item-btn').onclick=function(){
        let id=$('.slider-item').getAttribute('id');
        GetDetail(id);
        $('.MovieIframe').src=`https://www.2embed.ru/embed/tmdb/movie?id=${id}`;
        $('.modal-detail').classList.add('acitve');
    }
}

function Get(id){
    console.log(id)
    currentpage=1;
    NumCur.innerText=currentpage;
   Movie_Geners.classList.add('active');
    GetListMovieGenresBy(id)
}
// ${BASE_URL}/movie/${id}/videos?${api_key}

function GetListMovieGenresBy(id){
    ControlPage(GetListMovieGenresBy);
    IdCur=id;

    fetch(`${BASE_URL}/discover/movie?${api_key}&with_genres=${id}&page=${currentpage}`) // khi currentpage thay doi -> phim thay doi
    .then(function(res){
        return res.json();
    })
    .then(function(items){
        
     let htmls= items.results.map(function(item){
           return `
           <div id="${item.id}" class="gener-tag-list-item moive-item col l-3 m-4 c-6"  >
                    <div class="gener-tag-list-item-img" style="background-image: url(https://image.tmdb.org/t/p/original${item.poster_path});">
                          <div class="gener-tag-list-item-action">
                          <i class="fas fa-play-circle"></i>
                    
                        </div>
                    
                    </div>
                    <div class="gener-tag-list-item-contend">
                        <div class="gener-tag-list-item-name">${item.original_title}</div>
                        <div class="gener-tag-list-item-ranking">
                            <div class="gener-tag-list-item-year">${item.release_date}</div>
                            <div class="gener-tag-list-item-number-ranking">
                                <i class="fas fa-heart"></i>
                                ${Math.floor(item.popularity)}
                            </div>

                            <div class="gener-tag-list-item-star-ranking">
                                <i class="fas fa-star" "></i>
                                ${item.vote_average}
                            </div>
                        </div>
                    </div>
                </div>
           
           `;
            

       })
       Movie_Geners.innerHTML=htmls.join('');
    })
    .finally(function(){
        const play=$$('.moive-item');
        play.forEach(function(item){
            item.onclick=function(){
                console.log(("Get movie"));
                let id=item.getAttribute('id');
                GetDetail(id);

                $('iframe').src=`https://www.2embed.ru/embed/tmdb/movie?id=${id}`;
                $('.modal-detail').classList.add('acitve');
                document.onclick=function(e){
                    e.preventDefault();
                }
                console.log($('.modal-detail').classList.contains('active'));
            }
        })
    })

}

function GetTrending(URL,path){
    // i.push(2);
    fetch(Trending_URL_week).then(function(res){
        return res.json();
    })
    .then(function(items){
        // Getslide(items)
        
        // let htmlSlide=item.results

        let htmls=items.results.slice(0,14).map(function(item,idx){
            return `
            <li id="${item.id}" class="section-trending-item moive-item col l-2 m-3 c-6" >
             <div class="section-trending-img" style="background-image: url(https://image.tmdb.org/t/p/original${item.poster_path});"></div>
             <div class="overview-contend"><i class="fas fa-play-circle"></i></div>
            </li> 
            
            `
        })
        path.innerHTML=htmls.join('');
        // console.log($$('.moive-item'))
    })
   
}

function GetlistGenres(URL,path){
    fetch(URL).then(function(res){
        return res.json();
    })
    
    .then(function(items){
       items.genres.forEach(function(item){
        let htmls= `
            <div id="${item.id}" onclick="Get(this.getAttribute('id'))" class="gener-tag">${item.name}</div>
            
            `;
    
            path.insertAdjacentHTML("beforeend",htmls)
    
        })
        
   

            // document.querySelectorAll('.gener-tag');

    


    })

}

function GetTvShow(URL,path){
    fetch(URL).then(function(res){
        return res.json();
    })
    .then(function(items){
        items.results.forEach(function(item,idx){
            let html=`
            <div id="${item.id}" class="TV-show-item moive-item col l-2 m-3 c-6" >
                <div class="TV-show-item-action">
                       <i class="fas fa-play-circle"></i>
                </div>
                <div class="TV-show-item-img" style="background-image: url(https://image.tmdb.org/t/p/original${item.poster_path});"></div>
            </div>
            
            `;
            path.insertAdjacentHTML("beforeend",html)
        })
    })
}

function GetMovie(id){


    console.log(`${BASE_URL}/discover/movie?sort_by=popularity.desc&${api_key}&page=${currentpage}`)
    fetch(`${BASE_URL}/discover/movie?sort_by=popularity.desc&${api_key}&page=${currentpage}`).then(function(res){
        return res.json();
    })
    .then(function(items){
       let htmls= items.results.map(function(item){
           return `
           <div id="${item.id}" class="gener-tag-list-item moive-item col l-4 m-4 c-6">
                    <div class="gener-tag-list-item-img" style="background-image: url(https://image.tmdb.org/t/p/w500/${item.poster_path});">
                          <div class="gener-tag-list-item-action">
                          <i class="fas fa-play-circle"></i>
                    
                        </div>
                    
                    </div>
                    <div class="gener-tag-list-item-contend">
                        <div class="gener-tag-list-item-name">${item.original_title}</div>
                        <div class="gener-tag-list-item-ranking">
                            <div class="gener-tag-list-item-year">${item.release_date}</div>
                            <div class="gener-tag-list-item-number-ranking">
                                <i class="fas fa-heart movie-heart"></i>
                                ${Math.floor(item.popularity)}
                            </div>

                            <div class="gener-tag-list-item-star-ranking">
                                <i class="fas fa-star" "></i>
                                ${item.vote_average}
                            </div>
                        </div>
                    </div>
                </div>
           
           `;
            

       })
       Movie_Geners.innerHTML=htmls.join('');
    })
    .finally(function(){
        const play=$$('.gener-tag-list-item.moive-item');
        console.log(play);
        play.forEach(function(item){
            item.onclick=function(){
                console.log(("Get movie"));
                let id=item.getAttribute('id');
                GetDetail(id);

                $('.MovieIframe').src=`https://www.2embed.ru/embed/tmdb/movie?id=${id}`;
                $('.modal-detail').classList.add('acitve');
                document.onclick=function(e){
                    e.preventDefault();
                }
                console.log($('.modal-detail').classList.contains('active'));
            }
        })
    })
    
}
ControlPage(GetListMovieGenresBy);

ControlPage(GetMovie);
function ControlPage(Callback){
    
    NextBtn.onclick=function(){
        // Movie_Geners.scrollIntoView({
        //     behavior:'smooth'
        // })
        if(currentpage<MaxPage) {
            currentpage++;
            NumCur.innerText=currentpage;
            Callback(IdCur);
        }else{
            currentpage=1;
            NumCur.innerText=currentpage;
            Callback(IdCur);

        }
         Movie_Geners.scrollIntoView({
            behavior:'smooth'
        })
    }

    PrevBtn.onclick=function(){
        if(currentpage>1) {
            currentpage--;
            NumCur.innerText=currentpage;
            Callback(IdCur);
        }else{
            currentpage=MaxPage;
            NumCur.innerText=currentpage;
            Callback(IdCur);

        }
        Movie_Geners.scrollIntoView({
            behavior:'smooth',
            block:"nearest"
        })
    }
}

function SearchTag(){

    //Xử lý sự kiện đóng mở thanh Search 
    SearchBtn.onclick=function(){
        $('.nav-left').classList.toggle('active')
        if($('.nav-left').classList.contains('active')){
            $('.nav-left input').focus();
        }else{
            $('.nav-left input').blur();

        }
    }

    // Xử lý sự kiện khi nhấn vào thanh search thì bị mất
    $('.nav-left input').onclick=function(e){
        e.stopPropagation();
    }

    //xử lý sự kiện khi focus ra ngoài thanh search 
    $('.nav-left input').onblur=function(){
        this.value='';
        $('.nav-left').classList.remove('active')
    }
}

function SearchKeyWord(string){
    fetch(string).then(function(res){
        return res.json();
    })
    .then(function(items){
        if(items.results.length==0){
        }else
        {
            let htmls= items.results.map(function(item){
                return `
                <div id="${item.id}" class="gener-tag-list-item moive-item col l-3 m-4 c-6">
                         <div class="gener-tag-list-item-img" style="background-image: url(https://image.tmdb.org/t/p/original${item.poster_path});">
                               <div class="gener-tag-list-item-action">
                               <i class="fas fa-play-circle"></i>
                         
                             </div>
                         
                         </div>
                         <div class="gener-tag-list-item-contend">
                             <div class="gener-tag-list-item-name">${item.original_title}</div>
                             <div class="gener-tag-list-item-ranking">
                                 <div class="gener-tag-list-item-year">${item.release_date}</div>
                                 <div class="gener-tag-list-item-number-ranking">
                                     <i class="fas fa-heart"></i>
                                     ${Math.floor(item.popularity)}
                                 </div>
     
                                 <div class="gener-tag-list-item-star-ranking">
                                     <i class="fas fa-star" ></i>
                                     ${item.vote_average} 
                                     ${item.vote_count}
                                 </div>
                             </div>
                         </div>
                     </div>
                
                `;
                 
     
            })
            Movie_Geners.innerHTML=htmls.join('');
            


        }
    })
    .finally(function(){
        const play=$$('.gener-tag-list-item.moive-item');
        console.log(play);
        play.forEach(function(item){
            item.onclick=function(){
                console.log(("Get movie"));
                let id=item.getAttribute('id');
                $('.MovieIframe').src=`https://www.2embed.ru/embed/tmdb/movie?id=${id}`;
                $('.modal-detail').classList.add('acitve');
                GetDetail(id);

                document.onclick=function(e){
                    e.preventDefault();
                }
                console.log($('.modal-detail').classList.contains('active'));
            }
        })
    })
}


// console.log($$('.moive-item'))
function SearchFeature(){
    let query,flag=0;
    Search.onchange=function(e){
        // console.log(e)
        query=e.target.value;
    }
    Search.onkeyup=function(e){
        // query=e.target.value;
        
        if(e.which==13) {
            if(this.value=='') {
                $('.nav-left').classList.remove('active');
                console.log(123);
            }
            else{
                this.value='';
    
                // khúc này để search xong thì kéo xuống ra vùng ra kết quả tìm kiếm
                Movie_Geners.scrollIntoView({
                    behavior:'smooth'
                })
                $('.nav-left').classList.remove('active');
                let SearchUrl=BASE_URL+`/search/movie?`+api_key+`&query=${query}`;
                SearchKeyWord(SearchUrl);
            }
        }

    }
   
}
function Modal(){
    $('.modal-detail').onclick=function(){
        console.log(123)
        $('.modal-movie-detail-backdrop').style.backgroundImage='url()';
        $('.modal-detail').classList.remove('acitve')
        //$('iframe').src="";
        $('.MovieIframe').src="";
        $('.modal-movie-detail .TralerIframe').src="";
        // this.style.display='none';
    }
    Login_btn.onclick=function(){
        ModalTag.classList.toggle('open');
    }
  
   /*  ModalTag.onclick=function(e){
        console.log(123)
        this.classList.remove('open');

    } 
    $('.modal-resgister').onclick=function(e){
        e.stopPropagation();
    }   */

} 



function NavigateonMobile(){
    Header_navigate.onclick=function(){
        Headeritem.classList.toggle('active');
    }
    $('.close-btn').onclick=function(){
        Headeritem.classList.remove('active');
    }
    let nav_item=$$('.nav-item');
    nav_item.forEach(function(item){
        item.onclick=function(){
            Headeritem.classList.remove('active');
        }
    })

    $$('.header-navigate a').forEach(function(item){
        item.onclick=function(e){
            if(item.href.endsWith('#')) 
                e.preventDefault();
        }
    })
}

/* function FormHandle(){
    /// Xử lý phan input modal
    let Email,Pass;
    $('.Email-input').onchange=function(e){
        Email=e.target.value;
    }

    $('.Pass-input').oninput=function(e){
        if($('.Email-input').value !="" && $('.Pass-input').value !="")
            $('.btn-submit').classList.add('active');
        else $('.btn-submit').classList.remove('active');
    }
    
    $('.btn-submit').onclick=function(e){
        if($('.Email-input').value !="" && $('.Pass-input').value !="")
            console.log(true);
        else e.preventDefault();
    }
}  */

function FooterItem(){
    $$('.footer-list .footer-item').forEach(function(item){
        item.onclick=function(e){
            if(e.target.href.endsWith('#')) 
                e.preventDefault();
        }
    })
}


/* form  */

const email = document.querySelector('.email')
const pass = document.querySelector('.pass')
const confirmPass = document.querySelector('.confirm-pass')
const submitBtn = document.querySelector('.signup-btn')
const username = document.querySelector('.username')
let values = []
function getParent(element, selector){

    while(element.parentElement){
        if(element.parentElement.matches(selector)){
            return element.parentElement
        } else{
            element = element.parentElement
        }
    }
}

function checkPass(passValue, confirmValue){
    
    let inputWrap = getParent(confirmPass, '.input-wrap')
    let errorMess = inputWrap.querySelector('.error-mess')
    if(passValue != confirmValue){
      
        errorMess.innerText = 'Vui lòng nhập mật khẩu giống nhau'

    }   else{ 
        errorMess.innerText = ''
    }
    if(errorMess.innerText) return false
    else return true
}
function checkEmail (emailValue){
    let inputWrap = getParent(email,'.input-wrap')

    let errorMess = inputWrap.querySelector('.error-mess')
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(regex.test(emailValue) == false){
        
        errorMess.innerText = 'Trường này phải là email'
        
    } else{ 
        errorMess.innerText = ''
    }
    if(errorMess.innerText) return false
    else return true
}
function isExisted (emailValue) {
    let values = JSON.parse(localStorage.getItem('info')) 
    if(values == null) return true
    else{
        let flag  = 0;
        Array.from(values).forEach(item => {
            if(item.email == emailValue){
                alert(emailValue+ ' da ton tai');
                flag = 1;
            } 
        })
        if(flag == 0) return true
        else return false
    }
}
function checkEmail2 (emailValue){
    let inputWrap = getParent(emailIn,'.input-wrap')

    let errorMess = inputWrap.querySelector('.error-mess')
    console.log(errorMess);
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(regex.test(emailValue) == false){
        
        errorMess.innerText = 'Trường này phải là email'
        
    } else{ 
        errorMess.innerText = ''
    }
    if(errorMess.innerText) return false
    else return true
}
function isExisted2 (emailValue) {
    let values = JSON.parse(localStorage.getItem('info')) 
    
    
    if(values == null) alert('vui long dang ki truoc khi dang nhap')
    else{
        let flag  = 0;
        Array.from(values).forEach(item => {
            if(item.email == emailValue){
                
                flag = 1;
            } 
        })
        if(flag == 0) return false
        else return true
    }
    
}
function checkPass2 (passValue){
    let values = JSON.parse(localStorage.getItem('info')) 
    
        let inputWrap = getParent(passIn,'.input-wrap')

        let errorMess = inputWrap.querySelector('.error-mess')
        

        let flag  = 0;
        if(values == null) alert('vui long dang ki truoc khi dang nhap')
        else{
            Array.from(values).forEach(item => {
                if(item.pass == passValue){
                    flag = 1;
                } 
            })
            if(flag == 0) {
                errorMess.innerText = 'vui long nhap dung mat khau'
                return false
            }
            else{
                errorMess.innerText = ''
                return true
            }
        }
}

submitBtn.onclick = () => {
    
    
    if(email.value == '' || pass.value == '' || confirmPass.value == '' || username.value == ''){
        alert('Vui lòng không bỏ trống các trường')
    } else{
        let emailValue = email.value 
        let passValue = pass.value
        let confirmValue = confirmPass.value
        
        checkEmail(emailValue)
        checkPass(passValue, confirmValue)
        /* isExisted(emailValue)  */
        
        if(checkEmail(emailValue) == true && checkPass(passValue, confirmValue) == true  && isExisted(emailValue) == true ){
            const value = {
                email: email.value,
                pass: pass.value,
                confirmPass: confirmPass.value,
                username: username.value
            }
            values.push(value)
            localStorage.setItem('info', JSON.stringify(values))
            console.log(values);
            confirmPass.value = pass.value = email.value = username.value = '';
        }
    }

}

const closeBtn = document.querySelector('.close-btn')
closeBtn.onclick = () => {
    $('.modal').classList.remove('open')
}

/* sign-in form */
const emailIn = document.querySelector('.sign-in.email')
const passIn = document.querySelector('.sign-in.pass')
const submitBtnIn = document.querySelector('.sign-in.signup-btn')
submitBtnIn.onclick = () => {
    if(emailIn.value == '' || passIn.value == ''){
        alert('Vui lòng không bỏ trống các trường')
    } else{
        let emailInValue = emailIn.value 
        let passInValue = passIn.value
        
        checkEmail2(emailInValue)
        
        if(checkEmail2(emailInValue) == true  && isExisted2(emailInValue) == true && checkPass2(passInValue) == true){
          
            emailIn.value = passIn.value = ''
        }
        if(isExisted2(emailInValue) == false){
            alert('email nay chua duoc dang ki')
        }
      
        
    }
}

const closeBtnIn = document.querySelector('.sign-in.close-btn')
closeBtnIn.onclick = () => {
    $('.modal').classList.remove('open')
}

/* line */
const line = document.querySelector('.line-percent')
window.onscroll = () => {
   console.log(window.scrollY);
    line.style.width = this.scrollY/document.body.scrollHeight*110 + '%'
}


/* switch between sign-up sign-in form */
const signupForm = document.querySelector('.form.sign-up')
const signinForm = document.querySelector('.form.sign-in')
const switchBtn =  document.querySelectorAll('.switch')
console.log(switchBtn);
switchBtn[0].onclick = () => {
    signinForm.classList.remove('hide')
    signupForm.classList.add('hide')
}
switchBtn[1].onclick = () => {
    signupForm.classList.remove('hide')
    signinForm.classList.add('hide')
}


GetDetail(370172);
function GetDetail(id){
    fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=bec721bcb126b9938b6c2f7b39448c63`).then(res=>res.json())
    .then(function(items){
        let trailerurl=items.results[0];
        $('.modal-movie-detail .TralerIframe').src=`https://www.youtube.com/embed/${trailerurl.key}`;
    })
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=bec721bcb126b9938b6c2f7b39448c63`).then(res=>res.json())
    .then(function(item){

        console.log(`https://image.tmdb.org/t/p/original${item.backdrop_path}`)
        $('.modal-movie-detail-backdrop').style.backgroundImage=`url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        
    }) 
}
