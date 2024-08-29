
class keys {
  static get a() { return false }
  static get b() { return false }
  static get c() { return false }
  static get d() { return false }
  static get e() { return false }
  static get f() { return false }
  static get g() { return false }
  static get h() { return false }
  static get i() { return false }
  static get j() { return false }
  static get k() { return false }
  static get l() { return false }
  static get m() { return false }
  static get n() { return false }
  static get o() { return false }
  static get p() { return false }
  static get q() { return false }
  static get r() { return false }
  static get s() { return false }
  static get t() { return false }
  static get u() { return false }
  static get v() { return false }
  static get w() { return false }
  static get x() { return false }
  static get y() { return false }
  static get z() { return false }
  static get alt() { return false }
  static get shift() { return false }
  static get enter() { return false }
  static get escape() { return false }
  static get space() { return false }
  static get arrowup() { return false }
  static get arrowdown() { return false }
  static get arrowleft() { return false }
  static get arrowright() { return false }
  static get tab() { return false }
  static get backspace() { return false }
  static get capslock() { return false }
  static get control() { return false }
  static get meta() { return false }
  static get delete() { return false }
  static get end() { return false }
  static get home() { return false }
  static get insert() { return false }
  static get pageup() { return false }
  static get pagedown() { return false }
  static get f1() { return false }
  static get f2() { return false }
  static get f3() { return false }
  static get f4() { return false }
  static get f5() { return false }
  static get f6() { return false }
  static get f7() { return false }
  static get f8() { return false }
  static get f9() { return false }
  static get f10() { return false }
  static get f11() { return false }
  static get f12() { return false }
}

export class Keyboard extends keys {
  // private static readonly controller:any =  Object();
  private static readonly keys: { [key: string]: boolean } = {};
  static init() {
    const keyList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
      'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'alt', 'shift', 'enter', 'escape',
      'space', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'tab', 'backspace',
      'capslock', 'control', 'meta', 'delete', 'end', 'home', 'insert', 'pageup', 'pagedown',
      'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12']
    for (let key of keyList) {
      let k = () => !!this.keys[key]
      Object.defineProperty(this, key, {
        get: function () {
          return k()
        }
      })
    }
    window.addEventListener('keydown', (event) => {
      this.keys[event.key.toLowerCase()] = true
    })
    window.addEventListener('keyup', (event) => {
      this.keys[event.key.toLowerCase()] = false
    })

    window.addEventListener('blur', (event) => {
      for (let k of Object.keys(this.keys))
        this.keys[k] = false
    })
  }

}
