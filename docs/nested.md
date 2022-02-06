# Nested rule 

Rule restricts scss nested selectors. 
It forbids to break block, element or mod name and forces splitting between them.

## Config

```json
{
  "stylelint-bem-ruleset/nested": true
}
```

## Correct 

```scss

.block {
  &__element {
    
  }
  
  &_mod-name {
    &_first-mod-value {
      
    }
    &_second-mod-value {
      
    }
  }
  
  &__element {
    &_el-mod-name {
      &_first-mod-value {

      }
      &_second-mod-value {

      }
    }
  }
}

```


## Incorrect 

```scss

.block {
  &-differnt-block { // Bad, create BEM block implicitly  
    
  }
  
  &__element {
    &-another-element { // Bad, create BEM element implicitly
      
    }
  }
  
  &__element_boolean-mod { // Bad, too long to read
    
  }
  
  &_mod-name_mod-value { // Bad, mod_name and mod_value should be split
    
  }
}

```
