import emojiRegex  from 'emoji-regex';
import emoji from 'node-emoji';
(function(){
    {
        const s = new Set();
        [2,3,2,4,54,3,2,4,2,3].forEach(item=>{s.add(item)});
        console.log('set对象',s);
    }

    {
        console.log(':barber:' + ':haircut:' + ':100:' + ':star2:');
        console.log(emoji.emojify(':barber:' + ':haircut:' + ':100:' + ':star2:' ));
        document.getElementById('unicode').innerHTML = emoji.emojify(`
        :tea: :beer: :glass_of_milk: :cake: :id: :iphone: :icecream: :rose: :moon: :car: :hospital: :church: :evergreen_tree: :heart: :m: :dancer: :boy: :girl: :runner: :male-farmer: :male-cook: :goat: :sheep: 
        `);
    }
})()