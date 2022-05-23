type_g = ""

function processPokemonResp(data){
    for (i = 0; i < data.types.length; i++){
    
    if (data.types[i].type.name == type_g){
        $("#results").append("<p>" + data.id + "</p>")

    }
}
}

function display(type){
    $("#results").empty()
    type_g = type
    for(i = 0; i < 100; i++){
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: processPokemonResp
        })
    }
}


function setup(){
    display($("#pokemon_type option:selected").val());
    $("#pokemon_type").change(() =>{
        poke_type = $("#pokemon_type option:selected").val();
        display(poke_type)
    })
}

$(document).ready(setup)