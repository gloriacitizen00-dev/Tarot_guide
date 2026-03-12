if (typeof DEV_MODE !== "undefined" && DEV_MODE) {
console.log("Subscription guard disabled in DEV MODE");
}
else{
/* ----------------------------------
SUBSCRIPTION GUARD SYSTEM
Protects premium pages
---------------------------------- */

(function(){

const DAY = 24 * 60 * 60 * 1000;

const subscription = JSON.parse(localStorage.getItem("subscription"));

/* ----------------------------
NO SUBSCRIPTION
---------------------------- */

if(!subscription){

    alert("You need an active subscription to access this content.");

    window.location.href = "catalog.html";

    return;

}

/* ----------------------------
CHECK TRIAL EXPIRATION
---------------------------- */

const now = Date.now();

if(subscription.status === "trial"){

    if(now > subscription.trialEnds){

        subscription.status = "expired";

        localStorage.setItem("subscription", JSON.stringify(subscription));

    }

}

/* ----------------------------
CHECK ACTIVE SUBSCRIPTION
---------------------------- */

if(subscription.status === "active"){

    if(subscription.renewalDate && now > subscription.renewalDate){

        subscription.status = "expired";

        localStorage.setItem("subscription", JSON.stringify(subscription));

    }

}

/* ----------------------------
BLOCK EXPIRED USERS
---------------------------- */

if(subscription.status === "expired"){

    alert("Your subscription has expired. Please upgrade to continue.");

    window.location.href = "checkout.html?upgrade=true";

    return;

}

/* ----------------------------
CALCULATE DAYS LEFT
---------------------------- */

let daysLeft = null;

if(subscription.status === "trial"){

    const diff = subscription.trialEnds - now;

    daysLeft = Math.ceil(diff / DAY);

}

if(subscription.status === "active"){

    const diff = subscription.renewalDate - now;

    daysLeft = Math.ceil(diff / DAY);

}

/* ----------------------------
EXPOSE GLOBAL INFO
(for dashboards)
---------------------------- */

window.userSubscription = {

    plan: subscription.plan,

    status: subscription.status,

    daysLeft: daysLeft,

    renewalDate: subscription.renewalDate,

    trialEnds: subscription.trialEnds

};

})();
}
