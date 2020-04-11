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
    }
})()