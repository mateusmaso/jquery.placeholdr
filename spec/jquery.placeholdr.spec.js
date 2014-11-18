if (navigator.userAgent.indexOf('PhantomJS') < 0)
  describe("jquery.placeholder", function() {
    beforeEach(function() {
      this.fixtures = $("#fixtures");
    });

    afterEach(function() {
      this.fixtures.empty();
    });

    describe("input", function() {
      it("should show placeholder when empty", function() {
        this.input = $("<input>");
        this.input.attr("placeholder", "Foo Bar");
        this.input.appendTo(this.fixtures);
        this.input.placeholder();

        chai.expect(this.input.prev().css("display")).to.equal("block");
      });

      it("should hide placeholder when filled", function() {
        this.input = $("<input>");
        this.input.attr("placeholder", "Foo Bar");
        this.input.appendTo(this.fixtures);
        this.input.val("Hello World");
        this.input.placeholder();

        chai.expect(this.input.prev().css("display")).to.equal("none");
      });
    });

    describe("textarea", function() {
      it("should show placeholder when empty", function() {
        this.textarea = $("<textarea>");
        this.textarea.attr("placeholder", "Foo Bar");
        this.textarea.appendTo(this.fixtures);
        this.textarea.placeholder();

        chai.expect(this.textarea.prev().css("display")).to.equal("block");
      });

      it("should hide placeholder when filled", function() {
        this.textarea = $("<textarea>");
        this.textarea.attr("placeholder", "Foo Bar");
        this.textarea.appendTo(this.fixtures);
        this.textarea.val("Hello World");
        this.textarea.placeholder();

        chai.expect(this.textarea.prev().css("display")).to.equal("none");
      });
    });

    describe("contenteditable", function() {
      it("should show placeholder when empty", function() {
        this.contenteditable = $("<div contenteditable style='width: 100px; height: 20px;'>");
        this.contenteditable.attr("placeholder", "Foo Bar");
        this.contenteditable.appendTo(this.fixtures);
        this.contenteditable.html("<b></b>");
        this.contenteditable.placeholder();

        chai.expect(this.contenteditable.prev().css("display")).to.equal("block");
      });

      it("should hide placeholder when filled", function() {
        this.contenteditable = $("<div contenteditable style='width: 100px; height: 20px;'>");
        this.contenteditable.attr("placeholder", "Foo Bar");
        this.contenteditable.appendTo(this.fixtures);
        this.contenteditable.html("<ul><li></li></ul>");
        this.contenteditable.placeholder();

        chai.expect(this.contenteditable.prev().css("display")).to.equal("none");
      });
    });
  });
