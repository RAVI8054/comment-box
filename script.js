const input = document.getElementById("comment");
const addButton = document.getElementById("add");
const replyButton = document.getElementById("reply");
const subContainer = document.getElementById("sub-container");
const deleteAllComment = document.getElementById("dlt-comment");

addButton.addEventListener("click", () => {
    if(input.value.length <= 0){
        const showError = document.createElement("p");
        showError.textContent = "please enter something..!"
        showError.style.color = "red";
        input.nextElementSibling.append(showError);
    }
    else{
        if(input.nextElementSibling.children.length !== 0){
            input.nextElementSibling.children[0].remove();
        }
        
        const addedComment = document.createElement("li");
        addedComment.setAttribute("class", "list-group-item ");
        addedComment.style.fontSize = "20px";
        addedComment.style.margin = "10px";
        addedComment.innerHTML = `<p class="printed-comment">${input.value}</p>
        <div class="btn-list">       
            <p class="btn btn-outline-dark counter" id = "likeCounter">0</p>
            <button class = "btn btn-primary same-btn" id="like" onclick = "likeComment(this)" >Like</button>
            <button class = "btn btn-dark same-btn" id="dislike" onclick = "dislikeComment(this)" >Dislike</button>
            <button class = "btn btn-info same-btn" id="reply" onclick = "replyComment(this)">Reply</button>
            <button class = "btn btn-danger same-btn" id="dlt" onclick = "deleteComment(this)" >Delete</button>
        </div>
        <div class="container">
            <ul class="list-group replied-comment"></ul>
        </div>`
    
        subContainer.append(addedComment);
        input.value = "";             
        
       
    }
});

function likeComment(curr){
    let count = curr.previousElementSibling.textContent;
    count++;
    curr.previousElementSibling.textContent = count;
}

function dislikeComment(curr){
    let parent = curr.parentNode;
    let count = parent.children[0].textContent;
    if(count > 0){count--;}

    parent.children[0].textContent = count;
}

function deleteComment(curr){
    curr.parentNode.parentNode.remove();
}

function replyComment(curr){
    let parent = curr.parentNode.parentNode;
    let subContainerSec = document.createElement("div");
    let errorMsg = document.createElement("div");
    errorMsg.setAttribute("class", "error-msg");
    subContainerSec.setAttribute("class", "sub-container-sec input-group");
    subContainerSec.innerHTML = `
    <input type="text" class="form-control" placeholder="add your reply" aria-label="Recipient's username with two button addons">
    <button class="btn btn-outline-success" type="button" id="add-reply" onclick = "addReply(this)">Add reply</button>
    <button class="btn btn-outline-warning" type="button" id="cancel" onclick = "cancel(this)">Cancel</button>`;
    parent.append(subContainerSec);
    parent.append(errorMsg);
}
function addReply(curr){
    let inputText = curr.previousElementSibling.value;
    if(inputText.length === 0){
        curr.parentNode.nextElementSibling.textContent = "please type reply.."
    }
    else{
        if(curr.parentNode.nextElementSibling.textContent !== ""){
            curr.parentNode.nextElementSibling.textContent = "";
        }
        let replied = document.createElement("li");
        replied.setAttribute("class", "list-group-item");
    
        replied.textContent = inputText;
    
        curr.parentNode.parentNode.children[2].children[0].append(replied);
    
        curr.previousElementSibling.remove();
        curr.nextElementSibling.remove();
        curr.remove();
    }

}

function cancel(curr){
    curr.parentNode.remove();
}

deleteAllComment.addEventListener("click", ()=>{
    let n = subContainer.children.length;
    for(let elem = 0; elem < n; elem){
        if(subContainer.children.length !== 0){
            subContainer.removeChild(subContainer.children[elem]);
        }
        else{
            break;
        }
    }        
})