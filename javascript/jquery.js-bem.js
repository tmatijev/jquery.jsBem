;(function ($) {
	$.fn.jsBem = function (options) {
		var defaults = {
			bemESeparator: '__',
            bemMSeparator: '--',
            bemBlock: '',
            modifierClass: ''
		},

		jsBem = {
			opt: {},
            $block: {},
            $bems: {},
            $bemClassElements: {},
            $finalBems: {},
			init: function () {
				jsBem.opt = $.extend(defaults, options);
				jsBem.setBlockObject();
			},

            setBlockObject: function () {
                this.$block = $('*[data-bem-block="'+this.opt.bemBlock+'"]');
                this.$bems  = this.$block.find('*[data-bem="'+this.opt.bemBlock+'"]');
                
                if( !this.$bems.length ) {
                    console.log("No BEM elements found. Please re-check your code.")
                    return false;
                }
                
                this.setBemElements();
            },
            
            setBemElements: function () {
                var that = this;
                
                this.opt.$bemClassElements = $.map(this.$bems, function (n) {
                    var $n      = $(n);
                    var nClass  = $n.attr('class');
                    
                    // Find and separate BEM classes
                    if( that.isBemElement(nClass) || that.isBemModifier(nClass) ) {
                        that.getBemClass({
                            $el: $n,
                            classes: nClass.split(' ')
                        });
                    }
                });
            },
            
            getBemClass: function ($obj) {
                var that    = this;
                
                if( this.isBemElement($obj.classes[0]) ) {
                    $obj.classes = $obj.classes[0].split(this.opt.bemESeparator).join(' ');
                    this.setFinalBemClass($obj, this.opt.bemESeparator);
                } else if( this.isBemModifier($obj.classes[0]) ) {
                    $obj.classes = $obj.classes[0].split(this.opt.bemMSeparator).join(' ');
                    this.setFinalBemClass($obj, this.opt.bemMSeparator);
                }
            },
            
            isBemElement: function (s) {
                return s.split(this.opt.bemESeparator).length > 1 ? true : false;
            },
            
            isBemModifier: function (s) {
                return s.split(this.opt.bemMSeparator).length > 1 ? true : false;
            },
            
            setFinalBemClass: function ($obj, bemClass) {
                var that            = this;
                var splitClasses    = $obj.classes.split(' ');
                var joinClasses     = splitClasses.join(this.opt.bemMSeparator + this.opt.modifierClass + bemClass);
                
                var finalClass = '';
                
                for( var i = 0; i < splitClasses.length; i++ ) {
                    if( i == splitClasses.length - 1 && i < 2 ) {
                        // If is last element but still lower then 2
                        finalClass+= splitClasses[i];
                    }else if( i < 1 ){
                        // If is lower then 1
                        finalClass+= splitClasses[i] + this.opt.bemMSeparator + this.opt.modifierClass + bemClass;    
                    }else if( i > 1 ) {
                        // If is higher then 1
                        finalClass+= splitClasses[i];
                        console.log("Please try to keep your BEM elements with less nesting. You have 2 BEM Elements for this block: ", $obj.$el);
                    }else{
                        finalClass+= splitClasses[i] + bemClass;
                    }
                }
                
                $obj.$el.addClass(finalClass);
            }
		};
        
        $(function(){
            jsBem.init();
        });

		return this;
	}
}(jQuery));