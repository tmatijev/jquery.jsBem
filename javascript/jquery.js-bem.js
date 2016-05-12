;( function( $ ){
	$.fn.jsBem = function( options ) {
        var defaults = {
	    bemESeparator: "__",
            bemMSeparator: "--",
            bemBlock: "",
            modifierClass: ""
		},

		jsBem = {
	    opt: {},
            $blocks: {},
            $bems: {},
            $bemClassElements: {},
            $finalBems: {},
	    init: function () {
	        jsBem.opt = $.extend(defaults, options);
	        jsBem.setBlockObject();
	    },

            setBlockObject: function() {
                this.$blocks = $( '*[data-bem-block="' + this.opt.bemBlock + '"]' );
                this.$bems   = $( '*[data-bem="' + this.opt.bemBlock + '"]' );

                if ( !this.$bems.length ) {
                    console.log( "No BEM elements found. Please re-check your code." );
                    return false;
                }

                this.setBemElements();
            },
            
            setBemElements: function() {
                var that = this;
                
                for( var i = 0; i < this.$bems.length; i++ ) {
                    var $el     = $(this.$bems[i]);
                    var elClass = $el.attr( "class" );
                    
                    if ( this.isBemElement( elClass ) || this.isBemModifier( elClass ) ) {
                        this.bemClassController({
                            $el: $el,
                            classes: elClass.split( " " )
                        });
                    }
                }
            },

            bemClassController: function( $obj ) {
                if( this.isBemElement($obj.classes[0]) ) {
                    $obj.classes = $obj.classes[0].split(this.opt.bemESeparator).join(' ');
                    this.setFinalBemClass($obj, this.opt.bemESeparator);
                } else if( this.isBemModifier($obj.classes[0]) ) {
                    $obj.classes = $obj.classes[0].split(this.opt.bemMSeparator).join(' ');
                    this.setFinalBemClass($obj, this.opt.bemMSeparator);
                }
            },

            isBemElement: function( s ){
                return s.split( this.opt.bemESeparator ).length > 1;
            },

            isBemModifier: function( s ){
                return s.split( this.opt.bemMSeparator ).length > 1;
            },
            
            setFinalBemClass: function ($obj, bemClass) {
                var splitClasses    = $obj.classes.split(' ');
                var joinClasses     = splitClasses.join(this.opt.bemMSeparator + this.opt.modifierClass + bemClass);
                var classesLenght   = splitClasses.length;    
                var finalClass      = '';
                
                for( var i = 0; i < classesLenght; i++ ) {
                    if( i == classesLenght - 1 && i < 2 ) {
                        finalClass+= splitClasses[i];
                    }else if( i < 1 ){
                        finalClass+= splitClasses[i] + this.opt.bemMSeparator + this.opt.modifierClass + bemClass;    
                    }else if( i > 1 ) {
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
