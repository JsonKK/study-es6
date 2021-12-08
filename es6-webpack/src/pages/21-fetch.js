import '@/assets/css/pages.scss';


const privateMethods = Object.create({
  getAjax(url,data){
    return new Promise((resolve,reject)=>{
      if(typeof url !== 'string' || !url){
        reject('url not string');
      }
      if(data){
        const parmsData = Object.entries(data).join('&').replace(/,/g,'=');
        url += '?' + parmsData;
      }
      fetch(url)
        .then((response)=>{
          if(response.ok){
            return response.json()
          }
          else{
            reject()
          }
        })
        .then((jsonData)=>{
          resolve(jsonData)
        })
        .catch((err)=>{
          console.error(err)
        })
    })
  },
  loadImg(src){
    fetch(src)
      .then(async (response) => {
        if(response.ok){
          const bolb = await response.blob();
          console.log(bolb)
          const fileReader = new FileReader();
          console.log(fileReader.readAsDataURL(bolb))
          const objectURL = URL.createObjectURL(bolb);
          const img = new Image();
          img.src = objectURL;
          const li = document.createElement('li');
          //获取第一个pic-list
          const picList = document.querySelector('.pic-list');
          li.classList.add('pic-list-item');
          if(picList){
            li.appendChild(img);
            picList.appendChild(li);
          }
        }
      })
      .catch(err => console.error(err))
  }
})

export const initPage = ()=>{
  window.onload = ()=>{
    privateMethods.getAjax('https://test-gw-k8s-web.taqu.cn/message/v2/FamilyActivity/getFamilyActivityRank',{
      type : 2,
      page : 1
    }).then((res)=>{
      if(res && res.response_status === 'success'){
        const list = res.info.data || [];
        list.forEach((item)=>{
          privateMethods.loadImg(`https://forumimg01.jiaoliuqu.com/${item.image}`)
        })
      }
      
    })
  }
}