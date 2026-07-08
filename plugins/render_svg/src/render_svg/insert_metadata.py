from typing import Literal
from xml.etree import ElementTree as ET

from .namespaces import NAMESPACES

METADATA_T = dict[Literal["date", "description", "title"], str]

# The 'root' element is only needed to declare the namespaces for parsing
CC_META = """
<root
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:cc="http://creativecommons.org/ns#"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
<metadata>
  <rdf:RDF>
    <cc:Work rdf:about="">
      <cc:license rdf:resource="http://creativecommons.org/licenses/by-sa/4.0/" />
      <dc:title></dc:title>
      <dc:date></dc:date>
      <dc:format>image/svg+xml</dc:format>
      <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
      <dc:creator>
        <cc:Agent>
          <dc:title>Bryan Weber</dc:title>
        </cc:Agent>
      </dc:creator>
   </cc:Work>
   <cc:License
      rdf:about="http://creativecommons.org/licenses/by-sa/4.0/">
      <cc:permits
         rdf:resource="http://creativecommons.org/ns#Reproduction" />
      <cc:permits
         rdf:resource="http://creativecommons.org/ns#Distribution" />
      <cc:requires
         rdf:resource="http://creativecommons.org/ns#Notice" />
      <cc:requires
         rdf:resource="http://creativecommons.org/ns#Attribution" />
      <cc:permits
         rdf:resource="http://creativecommons.org/ns#DerivativeWorks" />
      <cc:requires
         rdf:resource="http://creativecommons.org/ns#ShareAlike" />
   </cc:License>
   </rdf:RDF>
</metadata>
</root>
"""


def create_metadata(title: str, description: str, date: str) -> ET.Element:
    # The 'root' element is needed to declare the namespaces for parsing
    root = ET.fromstring(CC_META)
    title_elem = ET.SubElement(root, "title")
    title_elem.text = title
    desc_elem = ET.SubElement(root, "desc")
    desc_elem.text = description

    meta = root.find("metadata")
    if meta is None:
        raise ValueError("Something went horribly wrong finding the metadata")

    rdf = meta.find("rdf:RDF", NAMESPACES)
    if rdf is None:
        raise ValueError("Could not find RDF tag")
    work = rdf.find("cc:Work", NAMESPACES)
    if work is None:
        raise ValueError("Could not find Work tag")
    dc_title_elem = work.find("dc:title", NAMESPACES)
    if dc_title_elem is None:
        raise ValueError("Could not find title element")
    dc_title_elem.text = title
    date_elem = work.find("dc:date", NAMESPACES)
    if date_elem is None:
        raise ValueError("Could not find date element")
    date_elem.text = date

    return root


def main(
    svg_tree: "ET.ElementTree[ET.Element[str]]", metadata_json: METADATA_T
) -> "ET.ElementTree[ET.Element[str]]":
    svg_element = svg_tree.getroot()
    if svg_element is None:
        raise ValueError("Could not find root SVG element")
    root_meta_elem = create_metadata(
        metadata_json["title"],
        metadata_json["description"],
        metadata_json["date"],
    )
    for metadata in root_meta_elem.iterfind("metadata"):
        svg_element.insert(1, metadata)
    for desc in root_meta_elem.iterfind("desc"):
        svg_element.insert(1, desc)
    for title in root_meta_elem.iterfind("title"):
        svg_element.insert(1, title)

    return svg_tree


if __name__ == "__main__":
    pass
