(function(root, factory) {

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      module.exports = factory(global.$);
    exports = factory(global.$);
  } else {
    factory(root.$);
  }

}(this, function($) {

  var HTMLRegExp = function(input) {
    var regexp = "";
    var tags = input.data("placeholder").tags;

    for (var tag in tags) {
      regexp += "<" + tags[tag] + ".*>";
      if (tag < tags.length - 1) regexp += "|";
    }

    return new RegExp(regexp);
  };

  var checkPlaceholder = function(input, placeholder) {
    var length = 0;

    if (input.is("input") || input.is("textarea")) {
      length = input.val();
    } else if (input.html().match(HTMLRegExp(input))) {
      length = input.html();
    } else {
      length = input.text();
    }

    if (!length) {
      if (input.data("placeholder").inputMinHeight < input.data("placeholder").height) {
        input.css("min-height", input.data("placeholder").height + parseInt(input.css("padding-bottom")));
      }

      placeholder.css("display", input.css("display"));
    } else {
      placeholder.hide();
    }
  };

  var buildPlaceholder = function(input) {
    var placeholder = $("<label>");
    var data = input.data("placeholder");

    placeholder.insertBefore(input);
    placeholder.html(input.attr("placeholder"));
    placeholder.css({
      "color": "#CCC",
      "cursor": "text",
      "position": "absolute",
      "class": "placeholder",
      "width": input.width(),
      "margin": input.css("margin"),
      "padding": input.css("padding"),
      "font-size": input.css("font-size"),
      "line-height": input.css("line-height"),
      "font-family": input.css("font-family")
    });

    input.removeAttr('placeholder');
    data.height = parseInt(placeholder.outerHeight());
    data.inputMinHeight = parseInt(input.css("min-height"));

    return placeholder;
  };

  $.fn.placeholder = function(options) {
    var input = $(this);
    input.data("placeholder", $.extend({ tags: ['img', 'ul'] }, options));

    var placeholder = buildPlaceholder(input);

    placeholder.on("click", function() {
      input.focus();
    });

    input.on("focus change blur keyup keydown", function() {
      checkPlaceholder(input, placeholder);
    });

    input.on("paste", function() {
      setTimeout(function() {
        checkPlaceholder(input, placeholder);
      }, 100);
    });

    if (input.attr('contenteditable')) {
      input.on("change keydown keypress input", function () {
        if (input.text()) {
          input.attr('placeholder-content', '');
        } else {
          input.removeAttr('placeholder-content');
        }
      });

      if (input.text()) {
        input.attr('placeholder-content', '');
      }
    }

    checkPlaceholder(input, placeholder);
  };

}));
