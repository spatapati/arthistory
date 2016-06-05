# This is the python script that converts the human-readable text in MASTER.txt into computer-readable text in old.js and new.js.
# There's no reason to edit this either; just edit MASTER.txt, then whenever you're done, run this and it will edit old.js and new.js
# accordingly.
import re
with open("MASTER.txt", 'r') as m:
	with open("old.js", 'w') as o:
		with open("new.js", 'w') as n:
			which = o # Switch everything to this.
			o.write("var old = [")
			n.write("var after = [")
			picture = True
			line = 0
			for i in m:
				line += 1
				if picture and i == '\n':
					raise Exception("You need a picture at line %d" % line)
				elif i[0] == "=":
					which = n
					picture = True
				elif re.search(r"^[/]{2}", i):
					pass
				elif picture:
					which.write("{front: '<img src=\"pictures/%s\" />', prefetch: '<img class=\"prefetch\" src=\"pictures/%s\" />', back: '" % (i.replace('\n', ''), i.replace('\n', '')))
					picture = False
				elif i == '\n' and not picture:
					which.write("'}, ")
					picture = True
				else:
					which.write(i.replace('\n', '<br/><br>').replace("'", r"\'"))
			o.write("'}];")
			n.write("'}];")