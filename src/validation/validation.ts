/* validators */

type RuleType = 'name' | 'email' | 'phone' | 'required'

type RuleConfig = {
  rule: RuleType,
  message: string
}

type PropConfig = {
  [prop: string]: RuleConfig[]
}

interface ValidatorConfig {
  [target: string]: PropConfig
}

const validators: ValidatorConfig = {}

/* decorator functions */

const Name = addRule('name')
const Email = addRule('email')
const Phone = addRule('phone')
const Required = addRule('required')

function addRule(rule: RuleType) {
  return function(prop: string, message: string) {
    return function(target: any, _: string) {
      target = target.constructor.name
      const ruleConfig = { rule, message }
      const propConfig = validators[target]?.[prop]?.filter(ruleConfig => ruleConfig.rule !== rule) || []
      propConfig.push(ruleConfig)
      validators[target] = {
        ...validators[target],
        [prop]: propConfig
      }
    }
  }
}

type MessageConfig = {[K in keyof PropConfig]: string}

function validationMessages(target: any): MessageConfig | undefined {
  let messages: ReturnType<typeof validationMessages>
  const targetValidator = validators[target.constructor.name]
  Object.keys(targetValidator).forEach(prop => {
    targetValidator[prop].forEach(ruleConfig => {
      if (!messages?.[prop]) {
        if (!isValid(target.state[prop], ruleConfig.rule)) {
          messages = { ...messages, [prop]: ruleConfig.message }
        }
      }
    })
  })
  return messages
}

function isValid(stateValue: any, rule: RuleType): boolean {
  if (rule === 'name') {
    const re = /^[a-zA-ZЁёА-я -]*$/
    return re.test(String(stateValue))
  }
  if (rule === 'email') {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(stateValue).toLowerCase())
  }
  if (rule === 'phone') {
    const re = /\+?\d([()-]?\d){10}/
    return re.test(String(stateValue))
  }
  if (rule === 'required') {
    return !!stateValue
  }
  return true
}

export {
  Name,
  Email,
  Phone,
  Required,
  validationMessages
}
