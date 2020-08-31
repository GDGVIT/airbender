const updateUsers = (oldState, newState, users, clientId) => {
    let newUserChannel = newState.channel;
    let oldUserChannel = oldState.channel;

    // User joined vc
    let joinedVC = oldUserChannel === null && newUserChannel !== null;
    // User left vc
    let leftVC = newUserChannel === null;
    // Check if voice status was changed because this bot entered/left channel
    let becauseOfBot = newState.id == clientId;

    if (!becauseOfBot) { 
        if (joinedVC) {
            users.add(newState.member.user);
        } else if (leftVC) {
            users.delete(newState.member.user);
        }
    } else {
        if (joinedVC) {
            // Bot joined VC
            users.add(...newUserChannel
                        .members
                        .array()
                        .filter((gM) => !gM.user.bot)
                        .map((gM) => gM.user)
            );
        } else if (leftVC) {
            // Bot left VC
            users.clear();
        }
    }
}

exports.updateUsers = updateUsers;