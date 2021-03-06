define   (['jquery', 'underscore', 'backbone',
    'hbs!templates/sessions_label',
    'hbs!templates/line_item'
],
function ( $,        _,            Backbone,
           SessionLabelTemplate,
           LineItemTemplate) {

return Backbone.View.extend({
    initialize:function (params) {
        _.extend(this, params);
        _.bindAll(this, "loadSession", "loadSessions", "saveNewSession", "saveSession", "getProducerAttributes");

        $(document.body).append(SessionLabelTemplate());

        $("a.new-session").on("click", function () {
            $(".sessions-labeler").modal("show");
        });

        $(".sessions-labeler button.save-new-session").click(this.saveNewSession);
        $("a.load-session").on("click", this.loadSession);
        $("a.save-session").on("click", this.saveSession);

        this.Router.Sessions.All.on("add", this.loadSessions);
        this.loadSessions();
    },

    loadSessions:function () {
        this.$el.empty();
        _.each(this.Router.Sessions.All.models, function (item) {
            this.$el.append(LineItemTemplate({ "a_class":"load-session", "id":item.get("id"), "label": item.get("label") }));
        }, this);
    },

    loadSession:function (e) {
        var sessionId = $(e.target).data("id");
        if (sessionId) {
            $("a.save-session").parent().removeClass("disabled");
            $("a.save-session").data("id", sessionId);
            this.$el.find("i").removeClass("icon-ok");
            $(e.target).find("i").addClass("icon-ok");
            this.Router.navigate("#s/" + sessionId, {trigger:true});
        }
    },

    saveNewSession:function () {
        var label = $(".sessions-labeler").find(".session-label").val();
        $(".sessions-labeler").modal("hide");
        
        this.$el.find("i").removeClass("icon-ok");

        var newSession = _.extend(this.getProducerAttributes(), { "label":label.trim(), "route":Backbone.history.fragment });
        this.Router.Sessions.All.create(newSession, {wait: true});
    },

    saveSession:function (e) {
        var sessionId = $(e.target).data("id");
        if (sessionId) {
            var session = this.Router.Sessions.All.get(sessionId);
            if (session) {
                session.save(_.extend(this.getProducerAttributes(), { "route":Backbone.history.fragment }));
            }
        }
    },

    getProducerAttributes:function () {
        var producer_attributes = {};
        _.each(this.Router.Sessions.Producers, function (producer, key) {
            var currentState = producer.currentState();
            if (currentState) {
                producer_attributes[key] = currentState;
            }
        });
        return producer_attributes;
    }
});

// end define
});