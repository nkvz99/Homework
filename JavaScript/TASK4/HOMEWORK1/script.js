console.log("Connected")

function tellStory(name , mood , activity){
    let story = `This is ${name}. ${name} is a nice person. Today they are ${mood}. They are ${activity} all day. The end.`
    return story
}
let zoran = tellStory("Zoran" , "good" , "playing football")
let marko = tellStory("Marko", "lazy" ," sleep")
console.log(zoran);
console.log(marko)
